/**
 * Push tags with retry.
 *
 * GitHub occasionally rejects a tag push with a transient 5xx. Retry a few times
 * instead of leaving the release half published.
 *
 * Usage: node scripts/push-tags.mjs [tag...]
 */

import { execFileSync } from 'node:child_process'

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const ATTEMPTS = 4
const DELAY_MS = 4000

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function tags() {
  return execFileSync('git', ['tag'], { cwd: ROOT, encoding: 'utf8' })
    .split('\n')
    .map((tag) => tag.trim())
    .filter(Boolean)
}

async function main() {
  const requested = process.argv.slice(2)
  const list = requested.length > 0 ? requested : tags()
  if (list.length === 0) {
    console.log('no tags to push')
    return
  }

  for (const tag of list) {
    let pushed = false
    for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
      try {
        execFileSync('git', ['push', 'origin', tag], { cwd: ROOT, stdio: 'pipe', encoding: 'utf8' })
        console.log(`pushed ${tag} on attempt ${attempt}`)
        pushed = true
        break
      } catch (error) {
        const message = String(error.stderr ?? error.message).trim().split('\n').slice(-2).join(' ')
        console.log(`attempt ${attempt} for ${tag} failed: ${message}`)
        if (attempt < ATTEMPTS) await sleep(DELAY_MS * attempt)
      }
    }
    if (!pushed) {
      console.error(`could not push ${tag} after ${ATTEMPTS} attempts`)
      process.exitCode = 1
    }
  }
}

main()
