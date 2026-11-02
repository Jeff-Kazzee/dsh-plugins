# Acceptance — <plugin-name>

status: proposed
row id: <loader entry id>
source: C:/Users/jeffk/Development/dsh-plugins/<dir>
acceptance written: <UTC timestamp>   # must precede install
frozen sha256: see RECEIPTS.md        # record before install; never edit below after mount
mounted at: <UTC timestamp>

## Capability gap

One sentence: what the agent cannot do today that this plugin must enable.

## Surface

Exact names that must exist after mount: tool names, UI slots, config keys, routes.

## Checks

Each check is one call or command with an observable expected result.

| # | Call or command | Expected |
|---|---|---|
| 1 | e.g. `mcp__browser__navigate_page` to the GUI URL | page loads, no error |
| 2 | | |

## Verification channel

Which independent channel runs the checks and why the plugin cannot fake it:
mobile browser MCP, separate shell, Lead reading an artifact, a test the plugin
does not own.

## Rollback

Exact row id to disable and the bundle name to uninstall.

## Result (append only, after verification)

- <UTC timestamp> check #: observed result
- verdict: keep | revise | rolled back
