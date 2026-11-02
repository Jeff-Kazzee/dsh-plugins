/**
 * Browser Verification - Host half.
 *
 * The Desktop surface keeps its GUI launch credential out of model context and its
 * embedded window already holds the signed cookie. An isolated browser (the
 * chrome-devtools MCP instance) starts with no cookie and sees
 * "dsh web authentication required".
 *
 * This plugin writes a one-shot local redirect page carrying the authenticated URL,
 * so the isolated browser can pick up the cookie without the credential ever
 * entering the conversation. The tool returns only the file path.
 */

import { mkdir, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

export const name = 'browser-verify-auth'

/** Hard dependencies: tool registry, connection credentials, advertised GUI URL. */
export const inject = ['tools', 'connection', 'webApp']

const DEFAULT_LOADER_PATH = path.join(os.tmpdir(), 'dsh-plugin-browser-verify-loader.html')

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function describeError(error) {
  return error instanceof Error ? error.message : String(error)
}

const WRITE_OUTPUT = {
  schema: {
    type: 'object',
    properties: { path: { type: 'string' } },
    required: ['path'],
  },
  render: (_args, value) => [{ type: 'text', text: `loader written: ${value.path}` }],
}

const CLEAR_OUTPUT = {
  schema: {
    type: 'object',
    properties: { removed: { type: 'boolean' }, path: { type: 'string' } },
    required: ['removed', 'path'],
  },
  render: (_args, value) => [
    { type: 'text', text: `loader ${value.removed ? 'removed' : 'already absent'}: ${value.path}` },
  ],
}

export function apply(ctx, config = {}) {
  const loaderPath =
    typeof config.loaderPath === 'string' && config.loaderPath.trim().length > 0
      ? config.loaderPath.trim()
      : DEFAULT_LOADER_PATH

  ctx.tools.register({
    name: 'browser_auth_loader',
    description:
      'Write a local HTML page that redirects an isolated browser to this Desktop GUI with its launch credential. Use it when the browser shows "dsh web authentication required". The result contains only the file path; say nothing about the file contents. Navigate to file:///<path> with the browser tools, reload from the 127.0.0.1 page, then call browser_auth_loader_clear.',
    parameters: { type: 'object', properties: {} },
    output: WRITE_OUTPUT,
    async execute() {
      const advertised = ctx.webApp.getAdvertisedUrl()
      const authenticated = ctx.connection.authenticatedUrl(advertised)
      const html = [
        '<!doctype html>',
        '<html><head><meta charset="utf-8"><title>DSH GUI handoff</title>',
        `<meta http-equiv="refresh" content="0;url=${escapeHtml(authenticated)}">`,
        '</head><body>Opening the DeepSeek Harness GUI...</body></html>',
      ].join('')
      await mkdir(path.dirname(loaderPath), { recursive: true })
      await writeFile(loaderPath, html, 'utf8')
      return { path: loaderPath }
    },
  })

  ctx.tools.register({
    name: 'browser_auth_loader_clear',
    description: 'Delete the one-shot GUI redirect page written by browser_auth_loader.',
    parameters: { type: 'object', properties: {} },
    output: CLEAR_OUTPUT,
    async execute() {
      try {
        await rm(loaderPath, { force: true })
        return { removed: true, path: loaderPath }
      } catch (error) {
        return { removed: false, path: `${loaderPath} (${describeError(error)})` }
      }
    },
  })
}
