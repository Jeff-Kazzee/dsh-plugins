# Browser Verification

Give a DeepSeek Harness agent eyes. This bundle mounts a headless
[`chrome-devtools-mcp`](https://github.com/ChromeDevTools/chrome-devtools-mcp) server
and a small credential-handoff tool, so the agent can open the real Web GUI (or any
page), read its accessibility tree, screenshot it, click through it, and read console
errors, then fix what it sees.

Use it when you want UI work verified instead of assumed: every plugin, theme, or
dashboard change can be checked against the running application.

## What you get

MCP tools, namespaced `mcp__browser__*`:

| Tool | Use |
|---|---|
| `take_snapshot` | Text accessibility tree of the page. Works with text-only models. |
| `take_screenshot` | PNG of the viewport (or full page). |
| `navigate_page`, `new_page`, `list_pages` | Open and move between pages. |
| `click`, `fill`, `press_key`, `hover` | Real interactions with real results. |
| `evaluate_script`, `wait_for` | Read state and wait for conditions. |
| `list_console_messages`, `get_console_message` | Catch runtime errors after a change. |
| `list_network_requests`, `get_network_request` | Failed requests, auth status, timing. |

Plus two Host tools:

| Tool | Use |
|---|---|
| `browser_auth_loader` | Write a one-shot redirect page that authenticates the isolated browser to the Desktop GUI. Returns only the path. |
| `browser_auth_loader_clear` | Delete the redirect page. |

## Install

Add this index to DSH **Plugins → Discover**:

```
https://raw.githubusercontent.com/Jeff-Kazzee/dsh-plugins/main/index.json
```

Or install from Git:

```sh
dsh plugin install "git+https://github.com/Jeff-Kazzee/dsh-plugins.git#<commit>&path:/browser-verify"
```

Requirements: Node 20+ and Google Chrome. The first run downloads
`chrome-devtools-mcp` through `npx`, so it can take a minute; the client reconnects
until the tools appear.

Rows added: `browser-verify` (MCP client, server name `browser`) and
`browser-verify-auth` (Host half). Nothing in the profile is overwritten.

## The Desktop auth handoff

The Desktop window holds a signed session cookie. An isolated browser does not, so
the GUI answers `dsh web authentication required`. The handoff keeps the launch
credential out of the conversation:

1. Call `browser_auth_loader`. It returns a `loader.html` path in your temp directory.
2. Navigate the browser to `file:///<that path>`. The page redirects to the GUI and the
   token exchange sets the cookie.
3. Reload from the page itself: `evaluate_script` with `() => location.reload()`.
   The redirect chain from `file://` is cross-site for cookie purposes and the session
   cookie is `SameSite=Strict`, so only a navigation initiated by the `127.0.0.1` page
   sends it. Without this step the GUI still shows the auth gate.
4. Call `browser_auth_loader_clear`.

On a plain `dsh --profile web` deployment opened in a normal browser, you do not need
the handoff at all: the browser is already authenticated.

## Configuration

- The `browser-verify` row's `args` can be edited in the profile patch to pin a
  specific `chrome-devtools-mcp` version, add `--slim`, `--viewport`, or
  `--executablePath`.
- `failOnStartupError` is `false` on purpose so a slow first `npx` run does not fail
  activation.
- File writes from the MCP server default to the OS temp directory. Add `--workspace
  <dir>` to the args if you want screenshots saved somewhere specific.

## Rollback

Disable the `browser-verify` row or uninstall the bundle in the Plugin Manager. The
loader file in your temp directory can be deleted at any time.

## How it was verified

On 2026-11-02 the agent authenticated to the live Desktop GUI, read the `New Session`
shell from the accessibility tree, clicked through the preview notice, and captured a
1440x900 screenshot through this bundle. The same tools were then used to verify the
release screenshots in this repository.

MIT licensed. See [LICENSE](../LICENSE).
