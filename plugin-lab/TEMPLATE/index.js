/**
 * Plugin-lab starter Host plugin.
 *
 * Registers one `lab_ping` tool and nothing else. Replace its body with the
 * smallest implementation that closes the acceptance file's gap; do not add a
 * second capability to the same plugin.
 */

export const name = 'lab-example'

/** Hard dependencies: the tool registry only. */
export const inject = ['tools']

export function apply(ctx) {
  ctx.tools.register({
    name: 'lab_ping',
    description:
      'Return a ping receipt proving this lab plugin is mounted and callable. Use it once after install, then delete it with the template.',
    parameters: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'Optional text echoed back in the receipt.',
        },
      },
    },
    output: {
      schema: {
        type: 'object',
        properties: { receipt: { type: 'string' } },
        required: ['receipt'],
      },
      render: (_args, value) => [{ type: 'text', text: value.receipt }],
    },
    async execute(args) {
      const message =
        typeof args?.message === 'string' && args.message.trim().length > 0 ? args.message.trim() : 'ok'
      return { receipt: `lab ping: ${message} (plugin lab-example v0.1.0)` }
    },
  })
}
