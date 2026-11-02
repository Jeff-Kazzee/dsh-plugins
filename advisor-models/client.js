// Advisor Models, browser half.
// Registers the `advisor` Tool call view. The view is a conversation excerpt,
// not a tool row: the question, each advisor's reply, its route, and token use
// are always rendered in the transcript.
// Everything here is plain React from the browser module table; no Harness
// Client package is imported.
window.__ModuleLoader__.load({
  id: '@local/advisor-models',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const CAUTION =
      'Advisor replies are opinions from other models. Check their claims against the actual work before acting.';
    const TEXT_KEYS = ['question', 'context', 'model', 'provider', 'reasoningEffort', 'purpose'];
    const RESULT_TEXT_KEYS = ['advisor', 'provider', 'model', 'reasoningEffort', 'text', 'error'];

    const ICON = h(
      'svg',
      { viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true },
      h('path', {
        d: 'M4 7.5A3.5 3.5 0 0 1 7.5 4h6A3.5 3.5 0 0 1 17 7.5v4A3.5 3.5 0 0 1 13.5 15H10l-3.2 2.7V15H7.5A3.5 3.5 0 0 1 4 11.5z',
        fill: '#93c5fd',
      }),
      h('path', {
        d: 'M10 12.5A3.5 3.5 0 0 1 13.5 9h3A3.5 3.5 0 0 1 20 12.5v3a3.5 3.5 0 0 1-3.5 3.5H15l-3 2.4V19h-1.5A3.5 3.5 0 0 1 10 15.5z',
        fill: '#38bdf8',
      }),
    );

    function isRecord(value) {
      return typeof value === 'object' && value !== null && !Array.isArray(value);
    }

    function safeParse(text) {
      if (typeof text !== 'string' || text === '') return undefined;
      try {
        return JSON.parse(text);
      } catch (error) {
        return undefined;
      }
    }

    function firstLine(text) {
      const index = text.indexOf('\n');
      return index === -1 ? text : text.slice(0, index);
    }

    function flattenContent(content) {
      if (!Array.isArray(content)) return '';
      const parts = [];
      for (const part of content) {
        if (isRecord(part) && part.type === 'text' && typeof part.text === 'string') parts.push(part.text);
      }
      return parts.join('\n');
    }

    function readArgs(phase, block) {
      const out = {};
      try {
        const args = block?.args;
        if (args !== undefined && typeof args.text === 'function') {
          for (const key of TEXT_KEYS) {
            const value = args.text(key);
            if (typeof value === 'string' && value !== '') out[key] = value;
          }
        }
      } catch (error) {
        // An incomplete argument view must not blank the card.
      }
      const raw = phase === 'result' ? block?.call?.argsRaw : block?.argsRaw;
      const parsed = safeParse(raw);
      if (isRecord(parsed)) {
        for (const key of TEXT_KEYS) {
          if (typeof parsed[key] === 'string' && parsed[key] !== '') out[key] = parsed[key];
        }
        if (Array.isArray(parsed.advisors)) {
          out.advisors = parsed.advisors.filter((name) => typeof name === 'string' && name !== '');
        }
      }
      return out;
    }

    function readMetaResults(block) {
      const meta = block?.meta;
      if (!isRecord(meta) || !Array.isArray(meta.results)) return null;
      const results = [];
      for (const raw of meta.results) {
        if (!isRecord(raw)) return null;
        const entry = {};
        for (const key of RESULT_TEXT_KEYS) {
          if (raw[key] !== undefined && typeof raw[key] !== 'string') return null;
          if (typeof raw[key] === 'string') entry[key] = raw[key];
        }
        if (entry.advisor === undefined || entry.provider === undefined || entry.model === undefined) return null;
        if (isRecord(raw.usage)) {
          const usage = {};
          for (const key of ['inputTokens', 'outputTokens', 'reasoningTokens']) {
            if (typeof raw.usage[key] === 'number' && Number.isFinite(raw.usage[key])) usage[key] = raw.usage[key];
          }
          if (Object.keys(usage).length > 0) entry.usage = usage;
        }
        if (typeof raw.cached === 'boolean') entry.cached = raw.cached;
        if (typeof raw.durationMs === 'number' && Number.isFinite(raw.durationMs)) entry.durationMs = raw.durationMs;
        results.push(entry);
      }
      return results;
    }

    function readMetaBudget(meta) {
      if (!isRecord(meta) || !isRecord(meta.budget)) return undefined;
      const budget = meta.budget;
      const picked = {};
      for (const key of ['calls', 'maxCalls', 'tokens', 'maxTokens']) {
        if (typeof budget[key] === 'number' && Number.isFinite(budget[key])) picked[key] = budget[key];
      }
      return picked.calls === undefined ||
        picked.maxCalls === undefined ||
        picked.tokens === undefined ||
        picked.maxTokens === undefined
        ? undefined
        : picked;
    }

    function formatBudgetLabel(budget) {
      if (!isRecord(budget)) return '';
      const format = function (value) {
        return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      };
      const callsText = budget.maxCalls > 0 ? `${budget.calls}/${budget.maxCalls} consults` : `${budget.calls} consults`;
      const tokensText =
        budget.maxTokens > 0 ? `${format(budget.tokens)}/${format(budget.maxTokens)} tokens` : `${format(budget.tokens)} tokens`;
      return `Turn budget: ${callsText}, ${tokensText}`;
    }

    /**
     * Fallback for results recorded before the structured presentation meta
     * existed: the Host renders one "### name — route" section per advisor.
     */
    function readContentResults(block) {
      const text = flattenContent(block?.content);
      if (!text.startsWith('### ')) return null;
      const results = [];
      const parts = text.split('\n\n### ');
      for (let index = 0; index < parts.length; index += 1) {
        const part = index === 0 ? parts[index] : `### ${parts[index]}`;
        const newline = part.indexOf('\n');
        const header = (newline === -1 ? part.slice(4) : part.slice(4, newline)).trim();
        let body = newline === -1 ? '' : part.slice(newline + 1).trim();
        const cautionAt = body.lastIndexOf(CAUTION);
        if (cautionAt !== -1) body = body.slice(0, cautionAt).trim();
        const dash = header.indexOf(' — ');
        const entry = { advisor: dash === -1 ? header : header.slice(0, dash) };
        if (dash !== -1) {
          const route = header.slice(dash + 3).split(' / ');
          if (route[0] !== undefined) entry.provider = route[0];
          if (route[1] !== undefined) entry.model = route[1];
          if (route[2] !== undefined) entry.reasoningEffort = route[2];
        }
        const usageMatch = /\n\n\(([^()]*)\)$/.exec(body);
        if (usageMatch !== null) {
          entry.usageText = usageMatch[1];
          body = body.slice(0, usageMatch.index).trim();
        }
        if (body.startsWith('FAILED: ')) entry.error = body.slice(8).trim();
        else entry.text = body;
        results.push(entry);
      }
      return results.length === 0 ? null : results;
    }

    function readResults(phase, block) {
      if (phase !== 'result') return null;
      const fromMeta = readMetaResults(block);
      if (fromMeta !== null) return fromMeta;
      return readContentResults(block);
    }

    function routeLabel(entry) {
      return [entry.provider, entry.model, entry.reasoningEffort].filter((part) => typeof part === 'string' && part !== '').join(' / ');
    }

    function usageLabel(entry) {
      if (typeof entry.usageText === 'string') return entry.usageText;
      const usage = entry.usage;
      if (!isRecord(usage)) return '';
      const parts = [];
      if (usage.inputTokens !== undefined) parts.push(`${usage.inputTokens} in`);
      if (usage.outputTokens !== undefined) parts.push(`${usage.outputTokens} out`);
      if (usage.reasoningTokens !== undefined) parts.push(`${usage.reasoningTokens} reasoning`);
      return parts.join(', ');
    }

    function errorText(block) {
      if (!isRecord(block) || block.isError !== true) return '';
      const flattened = flattenContent(block.content).trim();
      if (flattened !== '' && !flattened.startsWith('### ')) return flattened;
      const error = block.error;
      if (isRecord(error)) {
        const name = typeof error.name === 'string' ? error.name : '';
        const code = typeof error.code === 'string' ? error.code : '';
        const reason = typeof error.reason === 'string' ? error.reason : '';
        const label = [name, code].filter(Boolean).join(': ');
        if (label !== '') return reason === '' ? label : `${label} — ${reason}`;
      }
      return 'The advisor call failed.';
    }

    function stateOf(phase, block) {
      if (phase === 'result') return isRecord(block) && block.isError === true ? 'error' : 'ok';
      return phase === 'preparing' ? 'preparing' : 'running';
    }

    function Reply(props) {
      const entry = props.entry;
      const route = routeLabel(entry);
      const usage = usageLabel(entry);
      return h(
        'div',
        { className: 'advisor-view-reply' },
        h(
          'div',
          { className: 'advisor-view-head' },
          h('span', { className: 'advisor-view-name' }, entry.advisor),
          route === '' ? null : h('span', { className: 'advisor-view-route' }, route),
          entry.cached === true ? h('span', { className: 'advisor-view-chip' }, 'cached') : null,
          typeof entry.durationMs === 'number' && entry.durationMs > 0
            ? h('span', { className: 'advisor-view-chip' }, `${(entry.durationMs / 1000).toFixed(1)}s`)
            : null,
          usage === '' ? null : h('span', { className: 'advisor-view-usage' }, usage),
        ),
        entry.error !== undefined
          ? h('div', { className: 'advisor-view-text advisor-view-error' }, `FAILED: ${entry.error}`)
          : h('div', { className: 'advisor-view-text' }, entry.text ?? ''),
      );
    }

    function AdvisorCard(props) {
      const phase = props.phase;
      const block = props.block;
      const args = readArgs(phase, block);
      const results = readResults(phase, block);
      const names = Array.isArray(args.advisors) ? args.advisors : [];
      const who = names.length > 0 ? names.join(', ') : 'default advisor';
      const question = typeof args.question === 'string' ? args.question : '';
      const context = typeof args.context === 'string' ? args.context : '';
      const state = stateOf(phase, block);
      const failure = errorText(block);
      const settled = phase === 'result';

      const body = [];
      if (question !== '') {
        body.push(
          h(
            'div',
            { key: 'question', className: 'advisor-view-block' },
            h('div', { className: 'advisor-view-label' }, 'Question'),
            h('div', { className: 'advisor-view-question' }, question),
          ),
        );
      }
      if (context !== '') {
        body.push(
          h(
            'div',
            { key: 'context', className: 'advisor-view-block' },
            h('div', { className: 'advisor-view-label' }, 'Context'),
            h('div', { className: 'advisor-view-context' }, context),
          ),
        );
      }
      if (!settled) {
        body.push(
          h(
            'div',
            { key: 'waiting', className: 'advisor-view-running' },
            h('span', { className: 'advisor-view-dot', 'aria-hidden': true }),
            `Consulting ${who}\u2026`,
          ),
        );
      } else if (results !== null) {
        for (let index = 0; index < results.length; index += 1) {
          body.push(h(Reply, { key: `reply-${index}`, entry: results[index] }));
        }
      } else if (failure !== '') {
        body.push(h('div', { key: 'error', className: 'advisor-view-text advisor-view-error' }, failure));
      }
      const budgetLine = formatBudgetLabel(readMetaBudget(block?.meta));
      if (budgetLine !== '') body.push(h('div', { key: 'budget', className: 'advisor-view-budget' }, budgetLine));
      body.push(h('div', { key: 'caution', className: 'advisor-view-foot' }, CAUTION));

      return h(
        'div',
        { className: 'advisor-view-card', 'data-state': state },
        h(
          'div',
          { className: 'advisor-view-caption' },
          h('span', { className: 'advisor-view-caption-icon' }, ICON),
          h('span', { className: 'advisor-view-caption-label' }, 'Advisor'),
          h('span', { className: 'advisor-view-who' }, who),
          state === 'error' ? h('span', { className: 'advisor-view-state' }, 'failed') : null,
        ),
        h('div', { className: 'advisor-view-body' }, body),
      );
    }

    function TurnExchange(props) {
      const exchange = props.exchange;
      const who = exchange.names.length > 0 ? exchange.names.join(', ') : 'default advisor';
      const body = [];
      if (exchange.question !== '') {
        body.push(
          h(
            'div',
            { key: 'question', className: 'advisor-turn-block' },
            h('div', { className: 'advisor-turn-label' }, 'Question'),
            h('div', { className: 'advisor-turn-question' }, exchange.question),
          ),
        );
      }
      if (exchange.context !== '') {
        body.push(
          h(
            'div',
            { key: 'context', className: 'advisor-turn-block' },
            h('div', { className: 'advisor-turn-label' }, 'Context'),
            h('div', { className: 'advisor-view-context' }, exchange.context),
          ),
        );
      }
      if (exchange.results !== null) {
        for (let index = 0; index < exchange.results.length; index += 1) {
          body.push(h(Reply, { key: `reply-${index}`, entry: exchange.results[index] }));
        }
      } else if (exchange.failure !== '') {
        body.push(h('div', { key: 'error', className: 'advisor-view-text advisor-view-error' }, exchange.failure));
      } else {
        body.push(
          h(
            'div',
            { key: 'running', className: 'advisor-view-running' },
            h('span', { className: 'advisor-view-dot', 'aria-hidden': true }),
            `Consulting ${who}\u2026`,
          ),
        );
      }
      body.push(h('div', { key: 'caution', className: 'advisor-view-foot' }, CAUTION));
      return h(
        'div',
        { className: 'advisor-turn-card', 'data-state': exchange.failure !== '' ? 'error' : exchange.running ? 'running' : 'ok' },
        h(
          'div',
          { className: 'advisor-turn-caption' },
          h('span', { className: 'advisor-view-caption-icon' }, ICON),
          h('span', { className: 'advisor-turn-caption-label' }, 'Advisor exchange'),
          h('span', { className: 'advisor-turn-who' }, who),
        ),
        h('div', { className: 'advisor-turn-body' }, body),
      );
    }

    /**
     * Turn-tail contribution: visible after a completed Turn in the main flow.
     * Reads the Turn projection published by `advisorDefinition`, so it needs no
     * Tool-call expansion and no extra session event. Returns null for Turns that
     * did not consult an advisor.
     */
    function AdvisorTurnTail(props) {
      try {
        const turn = props.turn;
        const data =
          isRecord(turn) && turn.data !== undefined && typeof turn.data.get === 'function'
            ? turn.data.get('advisor-exchange')
            : undefined;
        const exchanges = isRecord(data) && Array.isArray(data.exchanges) ? data.exchanges : [];
        if (exchanges.length === 0) return null;
        const budget = isRecord(data) ? data.budget : undefined;
        const budgetLine = formatBudgetLabel(budget);
        return h(
          'div',
          { className: 'advisor-turn-list' },
          exchanges.map(function (exchange) {
            return h(TurnExchange, { key: exchange.callId, exchange });
          }),
          budgetLine === '' ? null : h('div', { key: 'budget', className: 'advisor-budget' }, budgetLine),
        );
      } catch (error) {
        return null;
      }
    }

    /**
     * Turn-local advisor accumulator. It publishes no view Node; it feeds the
     * Turn projection the tail panel reads, the same data-only mechanism the
     * delivered-files panel uses.
     */
    const advisorDefinition = {
      kind: 'advisor-exchange',
      target: 'chat',
      match: function (event) {
        if (event.type === 'turn/start') return { id: String(event.data.turn), role: 'start' };
        if (event.type === 'tool/call' || event.type === 'tool/result' || event.type === 'turn/end') {
          return { id: String(event.data.turn), role: 'update' };
        }
        return null;
      },
      start: function (_context, match) {
        if (match.event.type !== 'turn/start') throw new Error('advisor-exchange start requires turn/start');
        return { turn: match.event.data.turn, calls: [], exchanges: [] };
      },
      update: function (context, match) {
        if (match.event.type === 'tool/call') {
          if (match.event.data.name !== 'advisor') return context.state;
          const parsed = safeParse(match.event.data.arguments);
          const args = isRecord(parsed) ? parsed : {};
          const callId = String(match.event.data.callId);
          const entry = {
            callId,
            question: typeof args.question === 'string' ? args.question : '',
            context: typeof args.context === 'string' ? args.context : '',
            names: Array.isArray(args.advisors)
              ? args.advisors.filter(function (name) {
                  return typeof name === 'string';
                })
              : [],
            results: null,
            running: true,
            failure: '',
          };
          return {
            ...context.state,
            calls: [...context.state.calls, callId],
            exchanges: [...context.state.exchanges, entry],
          };
        }
        if (match.event.type === 'tool/result') {
          const callId = String(match.event.data.message.source.callId);
          const index = context.state.calls.indexOf(callId);
          if (index === -1) return context.state;
          const message = match.event.data.message;
          const results = readMetaResults({ meta: match.event.data.meta }) ?? readContentResults({ content: message.content });
          const budget = readMetaBudget(match.event.data.meta);
          const failure =
            message.isError === true
              ? errorText({ isError: true, content: message.content, error: match.event.data.error })
              : '';
          const exchanges = context.state.exchanges.slice();
          exchanges[index] = { ...exchanges[index], results, running: false, failure };
          return { ...context.state, exchanges, ...(budget === undefined ? {} : { budget }) };
        }
        return context.state;
      },
      buildLocationData: function (context, scope, previous) {
        if (scope !== 'turn' || context.state === undefined) return null;
        const exchanges = context.state.exchanges;
        const budget = context.state.budget;
        if (exchanges.length === 0) return null;
        if (
          previous !== undefined &&
          previous.kind === 'turn' &&
          previous.turn === context.state.turn &&
          previous.key === 'advisor-exchange' &&
          previous.value !== undefined &&
          previous.value.exchanges === exchanges &&
          previous.value.budget === budget
        ) {
          return previous;
        }
        return {
          kind: 'turn',
          turn: context.state.turn,
          key: 'advisor-exchange',
          value: { exchanges, ...(budget === undefined ? {} : { budget }) },
        };
      },
    };

    const CSS = [
      '.advisor-view-card{display:flex;flex-direction:column;gap:10px;min-width:0;margin:4px 0 6px 4px;padding:12px 16px 12px 14px;border-left:2px solid var(--dsw-alias-border-l2);border-radius:0 var(--dsw-radius-lg) var(--dsw-radius-lg) 0;background:var(--dsw-alias-bg-layer-1)}',
      '.advisor-view-caption{display:flex;align-items:center;gap:6px;min-width:0;color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px;letter-spacing:.04em;text-transform:uppercase}',
      '.advisor-view-caption-icon{display:inline-flex;flex:none;width:14px;height:14px}',
      '.advisor-view-caption-icon svg{width:14px;height:14px}',
      '.advisor-view-caption-label{flex:none}',
      '.advisor-view-who{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-transform:none;letter-spacing:0;color:var(--dsw-alias-label-secondary);font-size:12px}',
      '.advisor-view-state{flex:none;margin-left:auto;color:var(--dsw-alias-state-error-primary)}',
      '.advisor-view-body{display:flex;flex-direction:column;gap:14px;min-width:0}',
      '.advisor-view-block{display:flex;flex-direction:column;gap:4px;min-width:0}',
      '.advisor-view-label{font-size:11px;line-height:16px;letter-spacing:.04em;text-transform:uppercase;color:var(--dsw-alias-label-caption)}',
      '.advisor-view-question{margin:0;white-space:pre-wrap;overflow-wrap:anywhere;color:var(--dsw-alias-label-primary);font-size:var(--dsh-content-font-size,14px);line-height:calc(24px + var(--dsh-content-font-delta,0px))}',
      '.advisor-view-context{margin:0;white-space:pre-wrap;overflow-wrap:anywhere;color:var(--dsw-alias-label-tertiary);font-size:var(--dsh-content-font-size-secondary,13px);line-height:calc(22px + var(--dsh-content-font-delta-secondary,0px))}',
      '.advisor-view-running{display:flex;align-items:center;gap:8px;color:var(--dsw-alias-label-tertiary);font-size:var(--dsh-content-font-size-secondary,13px);line-height:calc(22px + var(--dsh-content-font-delta-secondary,0px))}',
      '.advisor-view-dot{flex:none;width:6px;height:6px;border-radius:50%;background:currentColor;animation:advisor-view-pulse 1.2s ease-in-out infinite}',
      '@keyframes advisor-view-pulse{0%,100%{opacity:.3}50%{opacity:1}}',
      '@media (prefers-reduced-motion:reduce){.advisor-view-dot{animation:none}}',
      '.advisor-view-reply{display:flex;flex-direction:column;gap:8px;min-width:0;padding-top:12px;border-top:.5px solid var(--dsw-alias-border-l2)}',
      '.advisor-view-head{display:flex;align-items:baseline;flex-wrap:wrap;gap:8px;min-width:0}',
      '.advisor-view-name{font-size:var(--dsh-content-font-size,14px);line-height:calc(20px + var(--dsh-content-font-delta,0px));font-weight:500;color:var(--dsw-alias-label-primary)}',
      '.advisor-view-route{font-family:var(--ds-font-family-code,monospace);font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary)}',
      '.advisor-view-usage{margin-left:auto;font-family:var(--ds-font-family-code,monospace);font-size:11px;line-height:16px;color:var(--dsw-alias-label-caption);white-space:nowrap}',
      '.advisor-view-chip{flex:none;padding:0 7px;border-radius:999px;background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:18px}',
      '.advisor-view-text{margin:0;white-space:pre-wrap;overflow-wrap:anywhere;color:var(--dsw-alias-label-primary);font-size:var(--dsh-content-font-size,14px);line-height:calc(24px + var(--dsh-content-font-delta,0px))}',
      '.advisor-view-error{color:var(--dsw-alias-state-error-primary)}',
      '.advisor-view-foot{font-size:11px;line-height:16px;color:var(--dsw-alias-label-caption)}',
      '.advisor-view-budget{margin:0;color:var(--dsw-alias-label-caption);font-family:var(--ds-font-family-code,monospace);font-size:11px;line-height:16px}',
      '.advisor-budget{margin-top:2px;color:var(--dsw-alias-label-caption);font-family:var(--ds-font-family-code,monospace);font-size:11px;line-height:16px}',
      '.advisor-turn-list{display:flex;flex-direction:column;gap:10px;min-width:0;margin:6px 0 4px 4px}',
      '.advisor-turn-card{display:flex;flex-direction:column;gap:10px;min-width:0;padding:14px 18px 14px 16px;border:.5px solid var(--dsw-alias-border-l1);border-radius:var(--dsw-radius-lg);background:var(--dsw-alias-bg-layer-1)}',
      '.advisor-turn-caption{display:flex;align-items:center;gap:6px;min-width:0;color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px;letter-spacing:.04em;text-transform:uppercase}',
      '.advisor-turn-caption-label{flex:none}',
      '.advisor-turn-who{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-transform:none;letter-spacing:0;color:var(--dsw-alias-label-secondary);font-size:12px}',
      '.advisor-turn-body{display:flex;flex-direction:column;gap:14px;min-width:0}',
      '.advisor-turn-block{display:flex;flex-direction:column;gap:4px;min-width:0}',
      '.advisor-turn-label{font-size:11px;line-height:16px;letter-spacing:.04em;text-transform:uppercase;color:var(--dsw-alias-label-caption)}',
      '.advisor-turn-question{margin:0;white-space:pre-wrap;overflow-wrap:anywhere;color:var(--dsw-alias-label-primary);font-size:var(--dsh-content-font-size,14px);line-height:calc(24px + var(--dsh-content-font-delta,0px))}',
    ].join('');

    function apply(ctx) {
      ctx.effect(function () {
        const style = document.createElement('style');
        style.setAttribute('data-advisor-view', 'cards');
        style.textContent = CSS;
        document.head.appendChild(style);
        return function () {
          if (style.parentNode !== null) style.parentNode.removeChild(style);
        };
      });
      ctx.effect(function () {
        return ctx.slots.inject('tool.call.toolview', function () {
          return ctx.slots.register({ name: 'tool.call.toolview', key: 'advisor' }, AdvisorCard);
        });
      });
      ctx.effect(function () {
        return ctx.slots.inject('conversation.chat.turnTail', function () {
          return ctx.slots.register({ name: 'conversation.chat.turnTail', id: 'advisor-models', order: 30 }, AdvisorTurnTail);
        });
      });
      // Optional: publish the per-Turn projection the tail panel reads. Deferred
      // injection keeps this independent of activation order: the Tool card must
      // work even if the Conversation service is absent or arrives later.
      ctx.effect(function () {
        const register = function (conversation) {
          try {
            return conversation.events.register(advisorDefinition);
          } catch (error) {
            return;
          }
        };
        if (typeof ctx.inject === 'function') {
          return ctx.inject(['uiConversation'], function (child) {
            return child.effect(function () {
              return register(child.uiConversation);
            });
          });
        }
        const conversation = ctx.get('uiConversation');
        return conversation === undefined ? undefined : register(conversation);
      });
    }

    return { inject: ['slots'], apply: apply };
  },
});
