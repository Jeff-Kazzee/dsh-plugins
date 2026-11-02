/**
 * Team Worktree — isolated teammate spawn.
 *
 * The Agent Teams service spawns a child with the Lead's *current effective*
 * directory, and the worktree runtime changes and returns a checkout through the
 * working-directory service. This plugin composes the two atomically:
 *
 *   remember Lead dir -> enter source repo -> create worktree (Lead dir becomes
 *   the checkout) -> spawn teammate (child inherits the checkout) -> restore
 *   Lead dir, always, in a finally block.
 *
 * A failed spawn keeps the worktree and branch (retained artifacts by design)
 * and reports their path so the Lead can inspect or remove them.
 */

export const name = 'team-worktree'

/** Hard dependencies: tool registry, teams, worktrees, session working directory. */
export const inject = ['tools', 'agentTeams', 'worktrees', 'workingDirectory']

const WORKTREE_PROTOCOL = [
  'You are working in an isolated Git worktree checkout.',
  '',
  'Rules:',
  '- Work only inside this checkout; never merge, rebase, or switch branches.',
  '- Do not touch the source checkout or other worktrees.',
  '- When finished: stage and commit all changes with one descriptive message, run',
  '  the relevant tests, then send the Lead a receipt containing: branch name, head',
  '  commit hash, files changed, the exact test command and its exit code, and any',
  '  unresolved problem. The Lead reviews the receipt and performs the merge.',
].join('\n')

function describeError(error) {
  return error instanceof Error ? error.message : String(error)
}

function textBlock(text) {
  return { type: 'text', text }
}

const OUTPUT = {
  schema: {
    type: 'object',
    properties: {
      member: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          id: { type: 'string' },
          status: { type: 'string' },
          provider: { type: 'string' },
          context: { type: 'string' },
        },
        required: ['name', 'id', 'status'],
      },
      worktree: {
        type: 'object',
        properties: {
          path: { type: 'string' },
          branch: { type: 'string' },
          baseCommit: { type: 'string' },
          repositoryRoot: { type: 'string' },
        },
        required: ['path', 'branch', 'baseCommit', 'repositoryRoot'],
      },
      leadDirectory: { type: 'string' },
    },
    required: ['member', 'worktree', 'leadDirectory'],
  },
  render: (_args, value) => [
    textBlock(
      [
        `spawned ${value.member.name} (${value.member.status}) in ${value.worktree.path}`,
        `branch ${value.worktree.branch} from ${value.worktree.baseCommit}`,
        `repository ${value.worktree.repositoryRoot}`,
        `lead directory restored to ${value.leadDirectory}`,
      ].join('\n'),
    ),
  ],
}

export function apply(ctx, config = {}) {
  const configuredProvider = typeof config.provider === 'string' ? config.provider : 'spawn'

  ctx.tools.register({
    name: 'spawn_teammate_in_worktree',
    description:
      'Create an isolated Git worktree checkout from a source repository, spawn a named teammate whose working directory is that checkout, and restore the Lead working directory. Use it for parallel work that would collide in one shared checkout. The teammate commits on its branch and reports a receipt; the Lead reviews with git diff and merges. Returns the roster row and the worktree record.',
    parameters: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Unique lowercase teammate name; also the worktree branch and directory name.',
        },
        description: {
          type: 'string',
          description: 'Short description of the delegated job.',
        },
        prompt: {
          type: 'string',
          description:
            'Self-contained task for the teammate. The worktree protocol and receipt requirement are prepended automatically.',
        },
        repositoryRoot: {
          type: 'string',
          description: 'Absolute path to the source Git checkout root (the repository that owns the new worktree).',
        },
        from: {
          type: 'string',
          description: 'Optional local commit-ish to base the worktree on. Defaults to HEAD.',
        },
        context: {
          type: 'string',
          enum: ['fresh', 'fork'],
          description: 'fresh (default) starts with no Lead history; fork seeds completed Lead turns.',
        },
      },
      required: ['name', 'description', 'prompt', 'repositoryRoot'],
    },
    output: OUTPUT,
    async execute(args, exec) {
      const caller = exec.agent
      const membership = ctx.agentTeams.tryMembership(caller)
      if (membership === undefined || membership.role !== 'lead') {
        throw new Error('team-worktree: only the Team Lead can spawn a teammate in a worktree')
      }
      const name = typeof args?.name === 'string' ? args.name.trim() : ''
      const description = typeof args?.description === 'string' ? args.description.trim() : ''
      const prompt = typeof args?.prompt === 'string' ? args.prompt.trim() : ''
      const repositoryRoot = typeof args?.repositoryRoot === 'string' ? args.repositoryRoot.trim() : ''
      if (name === '' || description === '' || prompt === '' || repositoryRoot === '') {
        throw new Error('team-worktree: name, description, prompt and repositoryRoot are required')
      }
      const context = args?.context === 'fork' ? 'fork' : 'fresh'
      const provider = context === 'fork' ? 'fork' : configuredProvider

      const leadDirectory = await ctx.workingDirectory.ensure(caller, exec.signal)
      let created
      try {
        await ctx.workingDirectory.set(caller, repositoryRoot, exec.signal)
        created = await ctx.worktrees.create(caller, { name, from: args?.from }, exec.signal)
        const result = await ctx.agentTeams.spawnTeammate(caller, {
          name,
          description,
          prompt: [textBlock(WORKTREE_PROTOCOL), textBlock('Task:\n' + prompt)],
          context,
          provider,
          signal: exec.signal,
        })
        return {
          member: {
            name: result.member.name,
            id: String(result.member.id),
            status: result.member.status,
            provider: result.member.provider ?? provider,
            context: result.member.context ?? context,
          },
          worktree: {
            path: created.path,
            branch: created.branch,
            baseCommit: created.baseCommit,
            repositoryRoot: created.repositoryRoot,
          },
          leadDirectory,
        }
      } catch (error) {
        const suffix =
          created === undefined
            ? ''
            : ` (worktree retained: ${created.path} on branch ${created.branch})`
        throw new Error(`team-worktree: spawn failed: ${describeError(error)}${suffix}`)
      } finally {
        await ctx.workingDirectory.set(caller, leadDirectory, exec.signal)
      }
    },
  })
}
