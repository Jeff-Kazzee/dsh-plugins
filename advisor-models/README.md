# Advisor Models

A DeepSeek Harness plugin that adds one tool, `advisor`: consult one or more
configured models as single-turn advisors. Each advisor is a model, reasoning
effort, system prompt, and purpose. The agent sends a question plus optional
context and gets labeled written advice back.

Advisors are **single-turn consults**. They have no tools, no conversation
history, and no ability to act. Agentic work stays with `subagent` and
teammates.

The consultation is visible in the Chat transcript as a conversation excerpt,
not a tool row: the question, every advisor's reply, its provider/model/reasoning
route, and token use are always shown.

Default route: `deepseek-account` / `deepseek-flash`, the same signed-in route
the Harness session already uses. No API key or extra configuration is needed
for the built-in presets.

## Install

Installed in profile `desktop` as a linked local bundle:

- Source: `C:/Users/jeffk/Development/dsh-plugins/advisor-models`
- Profile entry: `@local/advisor-models`, row id `advisor`

Install or reinstall through the Plugin Manager (`install_bundle` with this
directory), not by editing the profile by hand.

## Built-in advisors

| Name | Model | Reasoning | Purpose |
|---|---|---|---|
| `reviewer` | `deepseek-flash` | `max` | Strongest objection, biggest risk, cheapest test that exposes it |
| `architect` | `deepseek-flash` | `max` | Design/architecture tradeoff recommendation and what would change it |
| `quick` | `deepseek-flash` | `low` | Short, direct second opinion |

`reviewer` is the default when a call names no advisor. The signed-in account
currently serves `deepseek-flash` and `deepseek-v4-pro`; either can be used per
preset or per call.

## Tool arguments

| Argument | Required | Meaning |
|---|---|---|
| `question` | yes | The question, plan, claim, or decision to evaluate |
| `advisors` | no | Preset names to consult in parallel, up to `maxAdvisors`. Default: the configured default |
| `context` | no | Supporting material the question depends on |
| `provider` | no | Override the provider route for this call |
| `model` | no | Override the model id for this call |
| `reasoningEffort` | no | Override the reasoning effort (`low`, `medium`, `high`, `max`, or a provider-specific id) |
| `system` | no | Replace the preset system prompt for this call |
| `purpose` | no | Replace the preset purpose for this call; ignored when `system` is supplied |

Each advisor answers independently. One failing advisor does not lose the
others: its section reports the failure, and the call only errors when every
advisor fails.

## Where the exchange appears

After a Turn that consulted an advisor, the Chat transcript shows an **Advisor
exchange** panel in the main conversation flow, as a Turn-tail contribution. It
does not need a Tool call to be expanded:

- a muted **Advisor exchange** caption naming the advisors consulted
- the **Question** and optional **Context**, unchanged
- one reply block per advisor with its name, provider / model / reasoning
  effort, token use, a `cached` chip for a cache hit, and its latency
- failures in the error color with the provider's message
- a `Turn budget: N/M consults, T/T tokens` footer for the Turn
- a standing note that advisor replies are opinions, not verified facts

The same exchange also has a Tool-call view for the expanded work-details
transcript mode. Both surfaces use only `--dsw-alias-*` theme tokens and host
type metrics; neither imports a Harness Client package.

The panel reads the Session's projected tool results, so transcripts recorded
before this view existed show their consults too. While a call is still
running, the panel shows a "Consulting ..." line and fills in when the replies
settle.

## Configuration

The bundle ships the roster in its own `cordis.patch.yml`. To change it, add an
override row with the same id to `C:/Users/jeffk/.dsh/profiles/desktop/cordis.patch.yml`.
A matching override replaces the complete config, so include every field you
want to keep:

```yaml
- id: advisor
  name: '@local/advisor-models'
  config:
    defaultAdvisor: reviewer
    maxAdvisors: 3
    maxTokens: 8192
    timeoutMs: 180000
    maxCallsPerTurn: 6
    maxTokensPerTurn: 120000
    dedupeTtlMs: 600000
    advisors:
      reviewer:
        provider: deepseek-account
        model: deepseek-flash
        reasoningEffort: max
        purpose: Find the strongest objection and the cheapest test that would expose it.
      deep:
        provider: deepseek-account
        model: deepseek-v4-pro
        reasoningEffort: high
        purpose: Reason carefully about a hard engineering decision.
      muse:
        provider: meta
        model: muse-wonder
        purpose: Give a different model family's perspective.
      custom:
        provider: deepseek-account
        model: deepseek-flash
        system: >-
          You are a skeptical staff engineer. Reject hand-waving, name the
          failure mode, and end with one concrete next step.
```

| Config key | Default | Meaning |
|---|---|---|
| `defaultAdvisor` | first declared advisor | Preset used when a call names none |
| `maxAdvisors` | `3` | Upper bound on advisors per call |
| `maxTokens` | `8192` | Output-token cap per advisor |
| `timeoutMs` | `180000` | Per-consult timeout |
| `maxCallsPerTurn` | `6` | Model consults allowed in one Turn; cached hits cost nothing. `0` is unlimited |
| `maxTokensPerTurn` | `120000` | Input plus output tokens allowed in one Turn. `0` is unlimited |
| `dedupeTtlMs` | `600000` | How long an identical consult is served from cache; `0` disables the cache |
| `advisors` | built-in three | Named presets; each takes `provider`, `model`, `reasoningEffort`, `purpose`, `system` |

Unknown config keys and unknown advisor names fail the plugin row with a
readable error instead of being ignored. `provider`, `model`, and `purpose` are
required where noted; `reasoningEffort` and `system` are optional.

A Turn budget is enforced before dispatch: a call that would exceed
`maxCallsPerTurn`, or a new consult after `maxTokensPerTurn` is already spent,
fails with the current counters and a restart-the-turn message instead of
silently truncating the panel. The budget resets on the Session's next
`turn/start`, so each Turn gets its own allowance.

## Cost and limits

Every uncached consult is a separate model request billed to the signed-in
DeepSeek account, just like the session model. Bounds are `maxTokens` per
advisor, `maxAdvisors` per call, `timeoutMs` per consult, and the per-Turn
`maxCallsPerTurn` and `maxTokensPerTurn` ceilings. `reviewer` and `architect`
use max reasoning effort and cost the most; `quick` is the cheap one.

Identical consults are deduplicated in memory per Session for `dedupeTtlMs`.
The cache key covers provider, model, reasoning effort, system prompt, question,
and context, so a cached answer is only ever an exact repeat. Cached hits do not
consume the Turn budget, and the result and the panel mark them `cached`. The
cache is dropped on a Harness restart and is never written to disk.

Every result reports its duration and token use, and the panel ends with a
`Turn budget: N/M consults, T/T tokens` line, so spend and latency stay visible
after each call.

## Notes

- The tool description is generated from the config, so the model sees the
  current roster — names, models, efforts, and purposes — without a discovery
  call.
- Advisor replies are opinions from another model. The tool result and the card
  say so; verify claims against the work before acting.
- Editing the Host source requires a Harness restart to load a fresh Host
  module generation. A Client half change needs a page refresh at most.
  Config-only changes through the profile patch reload normally.
