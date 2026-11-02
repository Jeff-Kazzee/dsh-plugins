# Plugin Lab

The gated loop these plugins were built with. One capability per plugin, an
acceptance file written before the thing is mounted, an independent verification
channel, and a one-step rollback.

It is deliberately boring: no dynamic in-process plugin loading, no self-modifying
code. Every increment is a real bundle installed through the Plugin Manager, reversible
by disabling one row.

## The loop

1. **Gap.** One sentence, one capability. If it needs two gaps, it is two plugins.
2. **Acceptance before mount.** Copy `ACCEPTANCE.template.md` to
   `ACCEPTANCE/<plugin>.md` and fill every section. Freeze it: record the SHA-256 of
   the file before installing.
3. **Author.** Copy `TEMPLATE/` into a new directory. Rename the package, row id, tool
   name, locale entry, and icon. Keep the smallest surface that proves the gap.
4. **Install.** `plugin_manager` → `install_bundle` with the new directory. One plugin
   at a time.
5. **Verify.** Run every check in the acceptance file through a channel the plugin
   does not control: the browser tools against the live GUI, a separate shell, or a
   human reading an artifact. Append results to the file.
6. **Decide.** Keep, revise in the same bundle, or roll back (disable the row /
   uninstall the bundle). Never edit the acceptance checks after mount: fix the
   plugin, not the rule.

## Hard safety boundary

- The acceptance file lives outside the plugin package. Its hash is recorded before
  install, and the plugin has no reason to see or touch it.
- A plugin may not modify its own acceptance file, the profile patch, or another
  plugin's row. Capability changes go through a new acceptance.
- Host code gets no credential access and no filesystem or network scope wider than
  the stated gap.
- No plugin may rewrite the test that judges it.
- Rollback is always one step: disable the row, or uninstall the bundle.

## What shipped from this lab

| Plugin | Gap | Status |
|---|---|---|
| `browser-verify` | The agent could not see the rendered Web GUI | shipped; verified with a live screenshot, click, and console read |
| `team-worktree` | Teammates shared one checkout and collided | shipped; verified with two isolated teammates, receipts, a clean merge and one resolved conflict |

Two real defects were caught by the gate and fixed inside the same bundle before
release: a tool whose `render` returned a content block instead of an array, and a
GUI auth cookie that needed a same-site reload.

## Files

- `ACCEPTANCE.template.md` - the gate.
- `TEMPLATE/` - a minimal Host plugin with one tool, ready to copy.
- `RECEIPTS` are kept private; publish your own if you want to show the trail.

MIT licensed. See [LICENSE](../LICENSE).
