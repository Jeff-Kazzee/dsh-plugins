/**
 * Pre-publish hygiene check.
 *
 * Scans tracked files for secrets, personal absolute paths, and accidental build
 * output. Run in CI and before every tag.
 *
 * Usage: node scripts/check-repo.mjs
 */

import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')

const SECRET_PATTERNS = [
  /sk-[A-Za-z0-9_-]{20,}/,
  /ghp_[A-Za-z0-9]{20,}/,
  /github_pat_[A-Za-z0-9_]{20,}/,
  /xox[baprs]-[A-Za-z0-9-]{10,}/,
  /AKIA[0-9A-Z]{16}/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /(?:access_token|refresh_token|client_secret|api_key)\s*[:=]\s*['"][^'"]{12,}['"]/i,
  /C:\\Users\\jeffk\\/i,
]

const FORBIDDEN_TRACKED = [
  /\.credentials\.yaml$/i,
  /(^|\/)node_modules\//,
  /(^|\/)loader\.html$/,
  /\.env(\.|$)/,
]

function git(args) {
  return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim()
}

function main() {
  const files = git(['ls-files']).split('\n').filter(Boolean)
  const problems = []

  for (const file of files) {
    if (FORBIDDEN_TRACKED.some((pattern) => pattern.test(file))) {
      problems.push(`${file}: forbidden tracked path`)
      continue
    }
    if (/\.(png|jpg|jpeg|webp|gif|mp4|mov)$/i.test(file)) continue
    let text
    try {
      text = readFileSync(`${ROOT}/${file}`, 'utf8')
    } catch {
      problems.push(`${file}: unreadable`)
      continue
    }
    if (Buffer.byteLength(text) > 2_000_000) continue
    for (const pattern of SECRET_PATTERNS) {
      const match = text.match(pattern)
      if (match) problems.push(`${file}: matched ${pattern} near ${JSON.stringify(match[0].slice(0, 40))}`)
    }
  }

  if (problems.length > 0) {
    console.error('repo hygiene failed:')
    for (const problem of problems) console.error('  ' + problem)
    process.exit(1)
  }
  console.log(`repo hygiene OK: ${files.length} tracked files`)
}

main()
