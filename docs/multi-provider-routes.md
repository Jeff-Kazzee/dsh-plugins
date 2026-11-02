# Multi-provider routes: Claude and Codex models inside DSH

This is a setup guide, not a plugin. Everything here runs through DSH's shipped
`llm-pi-ai` adapter; there is nothing to install.

![Model picker with Claude and GPT models](assets/model-picker.png)

## What it does

`@deepseek-ai/dsh-llm-pi-ai` ships provider catalogs for `anthropic` and
`openai-codex`. Adding them as routes makes Claude and GPT models selectable in the
model picker for a session or a subagent. Auth comes from the harness credential
store under `llm-pi-ai/<provider>`; this build has no user-facing sign-in for those
providers, so the records are seeded from the OAuth grants the CLIs already hold.

## Policy caveat, read this first

- Using **API keys** for Anthropic or OpenAI is unambiguous and fine.
- Using the **CLIs as agents** (Claude Code headless / Agent SDK, Codex exec /
  app-server) is the intended use of those subscriptions.
- Copying a **subscription OAuth grant** into another harness's raw model route is
  not an intended use. Anthropic issues Claude Code OAuth for Claude Code; reusing it
  as a general LLM API may breach their terms. OpenAI's Codex OAuth is more tolerant
  in practice, but you are still using a client grant from a different client. You
  own that decision and the account risk. Do not build a product on it.

## Steps

1. Add the routes to `~/.dsh/profiles/desktop/cordis.patch.yml` (restating the
   existing `deepseek` and `meta` routes, because a patch replaces the whole config):

```yaml
- id: llm-pi-ai
  name: "@deepseek-ai/dsh-llm-pi-ai"
  config:
    providers:
      deepseek:
        apiKeyEnv: DEEPSEEK_API_KEY
      meta:
        apiKeyEnv: META_API_KEY
        models:
          - id: muse-wonder
      openai-codex:
        displayName: ChatGPT (Codex)
      anthropic:
        displayName: Claude
```

2. Seed the grant records. Back up `~/.dsh/.credentials.yaml`, then run:

```sh
python tools/seed-credentials.py
```

The script reads `~/.codex/auth.json` and `~/.claude/.credentials.json`, writes
`llm-pi-ai/openai-codex` and `llm-pi-ai/anthropic` grant records, backs up the store,
and never prints token values. It is idempotent.

3. Reload the profile (or restart DSH). The model picker now lists the catalog:
   Claude Fable/Haiku/Opus/Sonnet and the GPT/Codex families.

4. Pick a model per session, or pin one for fresh sessions with the
   `agent-default-model` row.

## Verify

Send a one-line prompt on each route. A working route answers; a stale grant fails
with `AUTH`, a missing record with `MISSING_CREDENTIAL`, a plan limit with `QUOTA`.

## Maintenance

The CLIs refresh the same OAuth grants, and refresh-token rotation can invalidate one
side. If a route starts failing with `AUTH`, re-run `tools/seed-credentials.py`. Keep
the backup file: `~/.dsh/.credentials.yaml.bak-*`.

## How we tested it

On 2026-11-02, `GPT-5.6 Luna` answered in 3 seconds and `Claude Haiku 4.5` answered
in 1 second in the same DSH session, with the model picker showing both catalogs.
