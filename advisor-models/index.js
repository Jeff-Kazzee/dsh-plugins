/**
 * Advisor Models: consult other models as single-turn advisors.
 *
 * This is a dependency-free Host plugin. It registers one `advisor` tool whose
 * roster and schema are built from the plugin config, and each consult is a
 * direct `ctx.llm` streaming call: one turn, no tools, no session history.
 */

/** Hard dependencies: the tool registry and the model-call service. */
export const inject = ['tools', 'llm']

/** Loader diagnostics name. */
export const name = 'advisor'

const DEFAULT_PROVIDER = 'deepseek-account'
const DEFAULT_MAX_ADVISORS = 3
const DEFAULT_MAX_TOKENS = 8192
const DEFAULT_TIMEOUT_MS = 180000
const MAX_TIMEOUT_MS = 2147483647
/** Per-turn ceilings, so repeated consults cannot quietly dominate a turn. */
const DEFAULT_MAX_CALLS_PER_TURN = 6
const DEFAULT_MAX_TOKENS_PER_TURN = 120000
/** Short session cache for identical consults; 0 disables it. */
const DEFAULT_DEDUPE_TTL_MS = 600000
const MAX_CACHE_ENTRIES = 100
const CONFIG_KEYS = new Set([
  'defaultAdvisor',
  'maxAdvisors',
  'maxTokens',
  'timeoutMs',
  'maxCallsPerTurn',
  'maxTokensPerTurn',
  'dedupeTtlMs',
  'advisors',
])
const ADVISOR_KEYS = new Set(['provider', 'model', 'reasoningEffort', 'purpose', 'system'])
const ADVISOR_ARG_KEYS = new Set([
  'question',
  'advisors',
  'context',
  'provider',
  'model',
  'reasoningEffort',
  'system',
  'purpose',
])

const DEFAULT_PURPOSE = 'Give a direct, specific second opinion on the question you are given.'

/** Advisors used when the plugin config declares none. */
const BUILT_IN_ADVISORS = {
  reviewer: {
    provider: DEFAULT_PROVIDER,
    model: 'deepseek-flash',
    reasoningEffort: 'max',
    purpose:
      'Find the strongest objection to the plan, claim, or decision you are given. Name the biggest risk, the assumption most likely to be wrong, and the cheapest test that would expose it. Do not rewrite the whole plan.',
  },
  architect: {
    provider: DEFAULT_PROVIDER,
    model: 'deepseek-flash',
    reasoningEffort: 'max',
    purpose:
      'Reason about design and architecture tradeoffs. Recommend one direction, name the alternatives and why they lost, and state what constraint would change the recommendation.',
  },
  quick: {
    provider: DEFAULT_PROVIDER,
    model: 'deepseek-flash',
    reasoningEffort: 'low',
    purpose: 'Give a short, direct second opinion. Lead with the answer, then at most a few bullets of reasoning.',
  },
}

function fail(message) {
  throw new Error(`advisor: ${message}`)
}

function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function requireString(label, value) {
  if (typeof value !== 'string' || value.trim().length === 0) fail(`${label} must be a non-empty string`)
  return value.trim()
}

function optionalString(label, value) {
  return value === undefined ? undefined : requireString(label, value)
}

function positiveInteger(label, value, max) {
  if (!Number.isInteger(value) || value < 1) fail(`${label} must be a positive integer`)
  if (max !== undefined && value > max) fail(`${label} must not exceed ${max}`)
  return value
}

function nonNegativeInteger(label, value, max) {
  if (!Number.isInteger(value) || value < 0) fail(`${label} must be a non-negative integer`)
  if (max !== undefined && value > max) fail(`${label} must not exceed ${max}`)
  return value
}

function normalizeAdvisor(entryName, entry) {
  if (!isRecord(entry)) fail(`advisors.${entryName} must be an object`)
  for (const key of Object.keys(entry)) {
    if (!ADVISOR_KEYS.has(key)) fail(`advisors.${entryName} has unknown key "${key}"`)
  }
  const provider = entry.provider === undefined ? DEFAULT_PROVIDER : requireString(`advisors.${entryName}.provider`, entry.provider)
  const model = requireString(`advisors.${entryName}.model`, entry.model)
  const reasoningEffort = optionalString(`advisors.${entryName}.reasoningEffort`, entry.reasoningEffort)
  const purpose = entry.purpose === undefined ? DEFAULT_PURPOSE : requireString(`advisors.${entryName}.purpose`, entry.purpose)
  const system = optionalString(`advisors.${entryName}.system`, entry.system)
  return {
    name: entryName,
    provider,
    model,
    ...(reasoningEffort === undefined ? {} : { reasoningEffort }),
    purpose,
    ...(system === undefined ? {} : { system }),
  }
}

/**
 * Validate the raw loader config and resolve defaults. Unknown keys are
 * rejected so a typo fails the plugin row with a readable error instead of
 * being silently ignored.
 */
function resolveConfig(rawConfig) {
  const input = rawConfig === undefined || rawConfig === null ? {} : rawConfig
  if (!isRecord(input)) fail('config must be an object')
  for (const key of Object.keys(input)) {
    if (!CONFIG_KEYS.has(key)) fail(`unknown config key "${key}"`)
  }
  const rawAdvisors = input.advisors === undefined ? BUILT_IN_ADVISORS : input.advisors
  if (!isRecord(rawAdvisors)) fail('config.advisors must be an object of named advisors')
  const names = Object.keys(rawAdvisors)
  if (names.length === 0) fail('config.advisors must declare at least one advisor')
  const advisors = {}
  for (const entryName of names) {
    if (entryName.trim().length === 0) fail('advisor names must be non-empty')
    advisors[entryName] = normalizeAdvisor(entryName, rawAdvisors[entryName])
  }
  const defaultAdvisor = input.defaultAdvisor === undefined ? names[0] : requireString('defaultAdvisor', input.defaultAdvisor)
  if (advisors[defaultAdvisor] === undefined) {
    fail(`defaultAdvisor "${defaultAdvisor}" is not configured; choose one of: ${names.join(', ')}`)
  }
  return {
    advisors,
    names,
    defaultAdvisor,
    maxAdvisors: input.maxAdvisors === undefined ? DEFAULT_MAX_ADVISORS : positiveInteger('maxAdvisors', input.maxAdvisors),
    maxTokens: input.maxTokens === undefined ? DEFAULT_MAX_TOKENS : positiveInteger('maxTokens', input.maxTokens),
    timeoutMs:
      input.timeoutMs === undefined
        ? DEFAULT_TIMEOUT_MS
        : positiveInteger('timeoutMs', input.timeoutMs, MAX_TIMEOUT_MS),
    maxCallsPerTurn:
      input.maxCallsPerTurn === undefined
        ? DEFAULT_MAX_CALLS_PER_TURN
        : nonNegativeInteger('maxCallsPerTurn', input.maxCallsPerTurn),
    maxTokensPerTurn:
      input.maxTokensPerTurn === undefined
        ? DEFAULT_MAX_TOKENS_PER_TURN
        : nonNegativeInteger('maxTokensPerTurn', input.maxTokensPerTurn),
    dedupeTtlMs:
      input.dedupeTtlMs === undefined
        ? DEFAULT_DEDUPE_TTL_MS
        : nonNegativeInteger('dedupeTtlMs', input.dedupeTtlMs),
  }
}

function describeAdvisor(advisor) {
  const route = [advisor.provider, advisor.model, advisor.reasoningEffort === undefined ? undefined : `${advisor.reasoningEffort} reasoning`]
    .filter((part) => part !== undefined && part.length > 0)
    .join(' / ')
  return `- ${advisor.name} (${route}): ${advisor.purpose}`
}

function toolDescription(config) {
  return [
    'Consult other models as advisors for a second opinion. Each advisor is a configured model, reasoning level, and purpose; a consult is one turn with no tools and no conversation history, so include everything it needs in the question or context.',
    'Use it when saved thinking is worth the extra model call: reviewing a plan, challenging a design, or sanity-checking a decision. Do not use it for work you can check yourself.',
    'Each turn has a consult and token budget. Identical consults in one session may be served from a short cache without spending budget, and the result reports the remaining budget.',
    'Configured advisors:',
    ...config.names.map((entryName) => describeAdvisor(config.advisors[entryName])),
    `Default advisor: ${config.defaultAdvisor}.`,
  ].join('\n')
}

function toolParameters(config) {
  return {
    type: 'object',
    additionalProperties: false,
    properties: {
      question: {
        type: 'string',
        description:
          'The question or task for the advisors. Include the plan, claim, or decision they should evaluate.',
      },
      advisors: {
        type: 'array',
        items: { type: 'string' },
        description: `Advisor names to consult; defaults to ${config.defaultAdvisor}. Available: ${config.names.join(', ')}.`,
      },
      context: {
        type: 'string',
        description: 'Optional supporting material (constraints, excerpts, prior decisions) the question depends on.',
      },
      provider: {
        type: 'string',
        description: 'Override the provider route for this consult. Defaults to each advisor preset.',
      },
      model: {
        type: 'string',
        description: 'Override the model id for this consult. Defaults to each advisor preset.',
      },
      reasoningEffort: {
        type: 'string',
        description:
          'Override the reasoning effort for this consult, such as low, medium, high, or max. Must be supported by the model.',
      },
      system: {
        type: 'string',
        description: 'Replace the advisor preset system prompt for this consult.',
      },
      purpose: {
        type: 'string',
        description:
          'Replace the advisor preset purpose for this consult. Ignored when system supplies the whole prompt.',
      },
    },
    required: ['question'],
  }
}

const USAGE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    inputTokens: { type: 'number' },
    outputTokens: { type: 'number' },
    reasoningTokens: { type: 'number' },
  },
}

const BUDGET_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    calls: { type: 'number' },
    maxCalls: { type: 'number' },
    tokens: { type: 'number' },
    maxTokens: { type: 'number' },
  },
  required: ['calls', 'maxCalls', 'tokens', 'maxTokens'],
}

function toolOutputSchema() {
  return {
    type: 'object',
    additionalProperties: false,
    properties: {
      results: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            advisor: { type: 'string' },
            provider: { type: 'string' },
            model: { type: 'string' },
            reasoningEffort: { type: 'string' },
            text: { type: 'string' },
            error: { type: 'string' },
            cached: { type: 'boolean' },
            durationMs: { type: 'number' },
            usage: USAGE_SCHEMA,
          },
          required: ['advisor', 'provider', 'model'],
        },
      },
      failed: { type: 'number' },
      budget: BUDGET_SCHEMA,
    },
    required: ['results', 'failed', 'budget'],
  }
}

function parseAdvisorArgs(args, config) {
  if (!isRecord(args)) fail('arguments must be an object')
  for (const key of Object.keys(args)) {
    if (!ADVISOR_ARG_KEYS.has(key)) fail(`unknown argument "${key}"`)
  }
  const question = requireString('question', args.question)
  const context = optionalString('context', args.context)
  const overrides = {
    provider: optionalString('provider', args.provider),
    model: optionalString('model', args.model),
    reasoningEffort: optionalString('reasoningEffort', args.reasoningEffort),
    system: optionalString('system', args.system),
    purpose: optionalString('purpose', args.purpose),
  }
  const requested = args.advisors === undefined ? [config.defaultAdvisor] : args.advisors
  if (!Array.isArray(requested)) fail('advisors must be an array of advisor names')
  if (requested.length === 0) fail('advisors must name at least one advisor')
  if (requested.length > config.maxAdvisors) fail(`at most ${config.maxAdvisors} advisors per call`)
  const advisors = []
  for (const value of requested) {
    const entryName = requireString('each selected advisor', value)
    const advisor = config.advisors[entryName]
    if (advisor === undefined) fail(`unknown advisor "${entryName}"; available: ${config.names.join(', ')}`)
    if (!advisors.includes(advisor)) advisors.push(advisor)
  }
  return { question, ...(context === undefined ? {} : { context }), advisors, overrides }
}

function buildSystemPrompt(advisorName, purpose) {
  return [
    `You are "${advisorName}", an advisor consulted by an AI agent working in the DeepSeek Harness.`,
    `Your purpose: ${purpose}`,
    'Answer in a single turn using only the question and context supplied. You have no tools and cannot act.',
    'Be direct and specific: lead with your verdict or recommendation, name your assumptions, and state what evidence would change your mind. Do not pad or restate the question.',
  ].join('\n')
}

function buildUserText(question, context) {
  return context === undefined ? question : `${question}\n\nContext:\n${context}`
}

function failureMessage(failure) {
  const message =
    isRecord(failure) && typeof failure.message === 'string' && failure.message.length > 0
      ? failure.message
      : 'the model request failed'
  return isRecord(failure) && typeof failure.code === 'string' && failure.code.length > 0
    ? `${message} (${failure.code})`
    : message
}

function pickUsage(usage) {
  if (!isRecord(usage)) return undefined
  const picked = {}
  for (const key of ['inputTokens', 'outputTokens', 'reasoningTokens']) {
    const value = usage[key]
    if (typeof value === 'number' && Number.isFinite(value)) picked[key] = value
  }
  return Object.keys(picked).length === 0 ? undefined : picked
}

/** Combine the caller signal with the consult timeout, and always clear the timer. */
function createDeadline(signal, timeoutMs) {
  const controller = new AbortController()
  const onAbort = () => controller.abort(signal.reason)
  if (signal === undefined) {
    // No caller signal to combine.
  } else if (signal.aborted) {
    controller.abort(signal.reason)
  } else {
    signal.addEventListener('abort', onAbort, { once: true })
  }
  const timer = setTimeout(() => {
    controller.abort(new Error(`advisor call timed out after ${timeoutMs} ms`))
  }, timeoutMs)
  if (typeof timer.unref === 'function') timer.unref()
  return {
    signal: controller.signal,
    dispose() {
      clearTimeout(timer)
      if (signal !== undefined) signal.removeEventListener('abort', onAbort)
    },
  }
}

/** Resolve the exact route, prompt, and input one consult will use. */
function planConsult(advisor, request) {
  const provider = request.overrides.provider ?? advisor.provider
  const model = request.overrides.model ?? advisor.model
  const reasoningEffort = request.overrides.reasoningEffort ?? advisor.reasoningEffort
  const purpose = request.overrides.purpose ?? advisor.purpose
  const system =
    request.overrides.system ?? (advisor.system === undefined ? buildSystemPrompt(advisor.name, purpose) : advisor.system)
  return {
    advisorName: advisor.name,
    provider,
    model,
    ...(reasoningEffort === undefined ? {} : { reasoningEffort }),
    ...(system === undefined ? {} : { system }),
    userText: buildUserText(request.question, request.context),
  }
}

function cacheKeyFor(plan) {
  return JSON.stringify([plan.provider, plan.model, plan.reasoningEffort ?? '', plan.system ?? '', plan.userText])
}

function sessionState(state, sessionId) {
  const key = String(sessionId === undefined ? 'no-session' : sessionId)
  let entry = state.sessions.get(key)
  if (entry === undefined) {
    entry = { calls: 0, tokens: 0, cache: new Map() }
    state.sessions.set(key, entry)
  }
  return entry
}

function pruneCache(entry) {
  while (entry.cache.size > MAX_CACHE_ENTRIES) {
    const oldest = entry.cache.keys().next()
    if (oldest.done === true) break
    entry.cache.delete(oldest.value)
  }
}

function readCache(entry, key, ttlMs, now) {
  if (ttlMs <= 0) return undefined
  const hit = entry.cache.get(key)
  if (hit === undefined) return undefined
  if (hit.expiresAt <= now) {
    entry.cache.delete(key)
    return undefined
  }
  return hit.result
}

function writeCache(entry, key, result, ttlMs, now) {
  if (ttlMs <= 0) return
  entry.cache.set(key, { result, expiresAt: now + ttlMs })
  pruneCache(entry)
}

function tokenCount(usage) {
  if (!isRecord(usage)) return 0
  const input = typeof usage.inputTokens === 'number' ? usage.inputTokens : 0
  const output = typeof usage.outputTokens === 'number' ? usage.outputTokens : 0
  return input + output
}

async function consultAdvisor(ctx, config, plan, signal) {
  const startedAt = Date.now()
  const deadline = createDeadline(signal, config.timeoutMs)
  try {
    const callConfig = { provider: plan.provider, model: plan.model, maxTokens: config.maxTokens }
    if (plan.reasoningEffort !== undefined) callConfig.reasoningEffort = plan.reasoningEffort
    const prepared = await ctx.llm.prepareCall(callConfig, deadline.signal)
    const messages = [
      {
        role: 'user',
        content: [{ type: 'text', text: plan.userText }],
      },
    ]
    const options = { ...prepared.config, messages, signal: deadline.signal }
    if (plan.system !== undefined) options.system = plan.system
    let deltas = ''
    const textBlocks = new Map()
    let usage
    let finish
    for await (const chunk of prepared.stream(options)) {
      switch (chunk.type) {
        case 'text-delta':
          deltas += chunk.text
          break
        case 'block-end':
          if (chunk.block !== undefined && chunk.block.type === 'text') textBlocks.set(chunk.index, chunk.block.text)
          break
        case 'usage':
          usage = pickUsage(chunk.usage)
          break
        case 'finish':
          finish = chunk.reason
          break
        default:
          break
      }
    }
    if (finish === undefined) throw new Error('the model stream ended without a finish reason')
    if (finish.kind === 'error' || finish.kind === 'aborted') throw new Error(failureMessage(finish.failure))
    const text = (deltas.length > 0 ? deltas : [...textBlocks.values()].join('')).trim()
    if (text.length === 0) throw new Error('the advisor returned no text')
    return {
      advisor: plan.advisorName,
      provider: prepared.config.provider,
      model: prepared.config.model,
      ...(prepared.config.reasoningEffort === undefined ? {} : { reasoningEffort: prepared.config.reasoningEffort }),
      text,
      ...(usage === undefined ? {} : { usage }),
      durationMs: Date.now() - startedAt,
    }
  } catch (error) {
    if (deadline.signal.aborted) {
      const reason = deadline.signal.reason
      if (reason instanceof Error && reason.message.length > 0) throw reason
      throw new Error('the advisor call was cancelled')
    }
    if (error instanceof Error) throw error
    throw new Error(String(error))
  } finally {
    deadline.dispose()
  }
}

async function executeAdvisor(ctx, config, state, args, exec) {
  const request = parseAdvisorArgs(args, config)
  const entry = sessionState(state, exec.agent === undefined ? undefined : exec.agent.id)
  const now = Date.now()
  const plans = request.advisors.map((advisor) => planConsult(advisor, request))
  const prepared = plans.map((plan, index) => {
    const key = cacheKeyFor(plan)
    return { index, plan, key, cached: readCache(entry, key, config.dedupeTtlMs, now) }
  })
  const misses = prepared.filter((item) => item.cached === undefined)
  const callsUsed = entry.calls
  if (config.maxCallsPerTurn > 0 && callsUsed + misses.length > config.maxCallsPerTurn) {
    fail(
      `turn call budget: ${callsUsed} of ${config.maxCallsPerTurn} consults already used and this call needs ${misses.length} more. Wait for the next turn or raise maxCallsPerTurn.`,
    )
  }
  if (config.maxTokensPerTurn > 0 && misses.length > 0 && entry.tokens >= config.maxTokensPerTurn) {
    fail(
      `turn token budget: ${entry.tokens} of ${config.maxTokensPerTurn} tokens already used. Wait for the next turn or raise maxTokensPerTurn.`,
    )
  }
  const outcomes = new Map()
  await Promise.all(
    misses.map(async (item) => {
      try {
        const result = await consultAdvisor(ctx, config, item.plan, exec.signal)
        entry.calls += 1
        entry.tokens += tokenCount(result.usage)
        writeCache(entry, item.key, result, config.dedupeTtlMs, Date.now())
        outcomes.set(item.index, { result })
      } catch (error) {
        entry.calls += 1
        outcomes.set(item.index, { error: error instanceof Error ? error.message : String(error) })
      }
    }),
  )
  const results = prepared.map((item) => {
    if (item.cached !== undefined) return { ...item.cached, cached: true, durationMs: 0 }
    const outcome = outcomes.get(item.index)
    if (outcome === undefined || outcome.error !== undefined) {
      return {
        advisor: item.plan.advisorName,
        provider: item.plan.provider,
        model: item.plan.model,
        ...(item.plan.reasoningEffort === undefined ? {} : { reasoningEffort: item.plan.reasoningEffort }),
        error: outcome === undefined ? 'the advisor call failed' : outcome.error,
        durationMs: 0,
      }
    }
    return outcome.result
  })
  const failed = results.filter((result) => result.error !== undefined).length
  if (failed === results.length) {
    const detail = results.map((result) => `${result.advisor}: ${result.error}`).join('; ')
    throw new Error(`all ${results.length} advisor call${results.length === 1 ? '' : 's'} failed: ${detail}`)
  }
  return {
    results,
    failed,
    budget: {
      calls: entry.calls,
      maxCalls: config.maxCallsPerTurn,
      tokens: entry.tokens,
      maxTokens: config.maxTokensPerTurn,
    },
  }
}

function formatCount(value) {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function formatBudget(budget) {
  if (!isRecord(budget)) return ''
  const calls = typeof budget.calls === 'number' ? budget.calls : 0
  const maxCalls = typeof budget.maxCalls === 'number' ? budget.maxCalls : 0
  const tokens = typeof budget.tokens === 'number' ? budget.tokens : 0
  const maxTokens = typeof budget.maxTokens === 'number' ? budget.maxTokens : 0
  const callsText = maxCalls > 0 ? `${calls}/${maxCalls} consults` : `${calls} consults`
  const tokensText =
    maxTokens > 0 ? `${formatCount(tokens)}/${formatCount(maxTokens)} tokens` : `${formatCount(tokens)} tokens`
  return `Turn budget: ${callsText}, ${tokensText}`
}

function renderResults(value) {
  const sections = []
  for (const entry of value.results) {
    const route = [entry.provider, entry.model, entry.reasoningEffort]
      .filter((part) => typeof part === 'string' && part.length > 0)
      .join(' / ')
    const notes = []
    if (entry.cached === true) notes.push('cached')
    if (typeof entry.durationMs === 'number' && entry.durationMs > 0) notes.push(`${(entry.durationMs / 1000).toFixed(1)}s`)
    const suffix = notes.length === 0 ? '' : ` [${notes.join(', ')}]`
    const header = `### ${entry.advisor}${route.length === 0 ? '' : ` — ${route}`}${suffix}`
    if (entry.error !== undefined) {
      sections.push(`${header}\nFAILED: ${entry.error}`)
      continue
    }
    let body = `${header}\n\n${entry.text}`
    if (entry.usage !== undefined) {
      const usage = [
        entry.usage.inputTokens === undefined ? undefined : `${entry.usage.inputTokens} in`,
        entry.usage.outputTokens === undefined ? undefined : `${entry.usage.outputTokens} out`,
        entry.usage.reasoningTokens === undefined ? undefined : `${entry.usage.reasoningTokens} reasoning`,
      ]
        .filter((part) => part !== undefined)
        .join(', ')
      if (usage.length > 0) body += `\n\n(${usage} tokens)`
    }
    sections.push(body)
  }
  const budgetLine = formatBudget(value.budget)
  if (budgetLine !== '') sections.push(`_${budgetLine}._`)
  sections.push('Advisor replies are opinions from other models. Check their claims against the actual work before acting.')
  return [{ type: 'text', text: sections.join('\n\n') }]
}

function presentAdvisorCall(args) {
  const names = Array.isArray(args?.advisors) && args.advisors.length > 0 ? args.advisors.join(', ') : 'default advisor'
  const question = typeof args?.question === 'string' ? args.question : ''
  return {
    card: 'generic',
    title: `advisor: ${names}`,
    kind: 'other',
    rawInput: question.length > 240 ? `${question.slice(0, 240)}...` : question,
  }
}

function createAdvisorTool(ctx, config, state) {
  return {
    name: 'advisor',
    description: toolDescription(config),
    parameters: toolParameters(config),
    output: {
      schema: toolOutputSchema(),
      render: (_args, value) => renderResults(value),
      // Structured results for the Chat card, so the user can read the exchange
      // without parsing the rendered text. Stored in the durable tool result meta.
      presentationMeta: (_args, value) => value,
    },
    timeoutMs: config.timeoutMs,
    isConcurrencySafe: () => true,
    async execute(args, exec) {
      return executeAdvisor(ctx, config, state, args, exec)
    },
    presentCall: presentAdvisorCall,
  }
}

/**
 * Register the `advisor` tool. The tool registry owns its registration on the
 * calling fiber, so no manual teardown is needed. A session event listener
 * resets the per-turn budget at each new turn.
 */
export function apply(ctx, config) {
  const resolved = resolveConfig(config)
  const state = { sessions: new Map() }
  ctx.on('session/event', (session, event) => {
    if (!isRecord(event) || event.type !== 'turn/start') return
    if (!isRecord(session) || typeof session.id !== 'string') return
    const entry = state.sessions.get(String(session.id))
    if (entry === undefined) return
    entry.calls = 0
    entry.tokens = 0
  })
  ctx.tools.register(createAdvisorTool(ctx, resolved, state))
}
