# Team Worktree

Give every Agent Teams teammate its own Git checkout, then merge through a review
gate. Parallel agents stop stepping on the same files.

DeepSeek Harness teammates share the Lead's working directory by design. Two agents
editing the same project in one working tree collide on writes, diffs, and tests.
This bundle composes the shipped worktree runtime with the Agent Teams service so the
Lead can spawn a teammate directly into an isolated worktree and get its directory
back immediately.

![Two teammates in isolated worktrees, merged through a review gate](assets/team-worktree.png)

## What you get

One Lead-only tool, `spawn_teammate_in_worktree`:

| Argument | Meaning |
|---|---|
| `name` | Unique teammate name; also the branch and checkout directory name. |
| `description` | Short description of the delegated job. |
| `prompt` | Self-contained task. The worktree protocol and receipt requirement are prepended. |
| `repositoryRoot` | Absolute path to the source Git checkout that owns the new worktree. |
| `from` | Optional local commit-ish. Defaults to `HEAD`. |
| `context` | `fresh` (default) or `fork`. |

The call is atomic from the session's point of view:

1. Remember the Lead's effective directory.
2. Enter `repositoryRoot` and create a new branch and checkout with the shipped
   worktree runtime (default `<repo>/.agents/worktrees/<name>`).
3. Spawn the teammate through `ctx.agentTeams.spawnTeammate`. The child inherits the
   Lead's current directory, which is now the checkout.
4. Restore the Lead's directory in a `finally` block, even when the spawn fails.

The teammate gets a protocol prefix: stay inside the checkout, never merge, commit
with one message, run the tests, and send a receipt with branch, head commit, changed
files, the exact test command, and its exit code.

## The merge gate

The Lead reviews and merges. The shell is enough:

```sh
git -C <repositoryRoot> log --format='%H %s' <baseCommit>..<branch>
git -C <repositoryRoot> diff --stat <baseCommit>..<branch>
git -C <repositoryRoot> diff <baseCommit>..<branch>
git -C <repositoryRoot> merge --no-ff <branch>
```

If the branch is wrong, message the teammate again (its inbox is durable) or reopen
the team task. The worktree stays available until you remove it.

## Install

Add this index to DSH **Plugins → Discover**:

```
https://raw.githubusercontent.com/Jeff-Kazzee/dsh-plugins/main/index.json
```

Or install from Git:

```sh
dsh plugin install "git+https://github.com/Jeff-Kazzee/dsh-plugins.git#<commit>&path:/team-worktree"
```

Requirements: Git 2.45+ (the shipped runtime needs it) and the experimental Agent
Teams packages, which ship with DSH. Rows added: `worktrees` (runtime) and
`team-worktree` (this plugin).

## Worked example

From the verification run: two teammates, one repository, two worktrees.

- `builder-demo` added `add(a, b)` on branch `builder-demo`, committed `36abb0c`,
  tested `sum=5`, reported the receipt. The Lead reviewed the diff, merged clean as
  `4ac71a6`.
- `builder-demo-2` added `multiply(a, b)` on branch `builder-demo-2`, committed
  `70d891e`. Its branch started from the same base, so the merge conflicted in
  `src/app.js`. The Lead resolved it keeping `add` once plus `multiply`, committed
  `2a8cb26`, and the final test on `main` passed: `hello team`, `sum=5`,
  `product=42`, exit 0, clean tree.

The conflict is the point: the gate catches what one shared checkout hides.

## Known limits

- Worktrees base on a local commit. Staged, unstaged, untracked, and ignored source
  files are not copied.
- Parallel branches from one base can conflict on adjacent edits. The Lead resolves
  them at the gate.
- Cleanup (worktree remove, branch delete) is manual by design; the runtime retains
  checkouts and branches.
- The session file policy governs creation. The source repository must be inside the
  session's writable workspace, or the permission preset must allow it.
- The teammate's sandbox root follows its session directory (the checkout), so a
  checkout outside the workspace cannot be edited by the teammate.

## Rollback

Disable the `team-worktree` and `worktrees` rows, or uninstall the bundle. Retained
worktrees and branches are untouched.

MIT licensed. See [LICENSE](../LICENSE).
