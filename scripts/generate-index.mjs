/**
 * Generate index.json for the DSH plugin market (format 1).
 *
 * Usage:
 *   node scripts/generate-index.mjs [--repo <git-url>] [--commit <sha>] [--check]
 *
 * The index pins each plugin's git source to a commit, so publish the plugin files
 * first, then generate and commit the index in a follow-up commit.
 */

import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DEFAULT_REPO = 'https://github.com/Jeff-Kazzee/dsh-plugins'
const PLUGINS = [
  { dir: 'browser-verify', category: 'developer-tools', labels: ['browser', 'verification'], order: 2 },
  { dir: 'team-worktree', category: 'agents', labels: ['agent-teams', 'git'], order: 1 },
]

const INDEX = {
  format: 1,
  title: { en: 'Jeff Kazzee DSH Plugins' },
  description: {
    en: 'Browser verification and worktree-isolated Agent Teams for DeepSeek Harness.',
  },
  metadata: {
    categories: {
      agents: { title: { en: 'Agents' } },
      'developer-tools': { title: { en: 'Developer tools' } },
    },
    labels: {
      'agent-teams': { title: { en: 'Agent Teams' } },
      browser: { title: { en: 'Browser' } },
      git: { title: { en: 'Git' } },
      verification: { title: { en: 'Verification' } },
    },
    sortKeys: {
      order: { title: { en: 'Recommended order' }, order: 'asc' },
    },
  },
}

function parseArgs(argv) {
  const args = { repo: DEFAULT_REPO, commit: undefined, check: false }
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (arg === '--check') args.check = true
    else if (arg === '--repo') args.repo = argv[++index]
    else if (arg === '--commit') args.commit = argv[++index]
  }
  return args
}

function git(args) {
  return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim()
}

function dataIcon(pluginDir) {
  const svg = readFileSync(join(ROOT, pluginDir, 'icon.svg'))
  if (svg.byteLength > 32 * 1024) throw new Error(`${pluginDir}/icon.svg exceeds 32 KiB`)
  return `data:image/svg+xml;base64,${svg.toString('base64')}`
}

function buildIndex({ repo, commit }) {
  const plugins = PLUGINS.map(({ dir, category, labels, order }) => {
    const manifest = JSON.parse(readFileSync(join(ROOT, dir, 'package.json'), 'utf8'))
    const enginesDsh = manifest.engines?.dsh
    if (typeof enginesDsh !== 'string') throw new Error(`${dir}: engines.dsh is required`)
    return {
      name: manifest.name,
      title: { en: manifest.name },
      description: { en: manifest.description },
      icon: dataIcon(dir),
      author: manifest.author,
      homepage: manifest.homepage,
      repository: { url: 'https://github.com/Jeff-Kazzee/dsh-plugins', directory: dir },
      metadata: { category, keywords: manifest.keywords ?? [], labels, sortKeys: { order } },
      versions: [
        {
          version: manifest.version,
          publishTimestamp: Math.floor(Date.now() / 1000),
          source: { type: 'git', url: repo, commit, path: dir },
          engines: { dsh: enginesDsh },
        },
      ],
    }
  })
  return { ...INDEX, plugins }
}

function checkShape(index) {
  const problems = []
  if (index.format !== 1) problems.push('format must be 1')
  const names = new Set()
  for (const plugin of index.plugins) {
    if (names.has(plugin.name)) problems.push(`duplicate plugin ${plugin.name}`)
    names.add(plugin.name)
    for (const version of plugin.versions) {
      if (!/^[0-9a-f]{40}$/u.test(version.source.commit)) problems.push(`${plugin.name}: commit must be 40 hex`)
      if (version.source.type !== 'git') problems.push(`${plugin.name}: source must be git`)
      if (!/^[0-9]+$/u.test(String(version.publishTimestamp))) problems.push(`${plugin.name}: bad timestamp`)
    }
    if (!plugin.icon.startsWith('data:image/svg+xml;base64,')) problems.push(`${plugin.name}: icon must be an SVG data URL`)
  }
  return problems
}

function main() {
  const args = parseArgs(process.argv.slice(2))
  const indexPath = join(ROOT, 'index.json')

  if (args.check) {
    if (!existsSync(indexPath)) throw new Error('index.json is missing')
    const index = JSON.parse(readFileSync(indexPath, 'utf8'))
    const problems = checkShape(index)
    if (problems.length > 0) throw new Error(problems.join('\n'))
    console.log(`index.json OK: ${index.plugins.length} plugins`)
    return
  }

  const commit = args.commit ?? git(['rev-parse', 'HEAD'])
  if (!/^[0-9a-f]{40}$/u.test(commit)) throw new Error(`invalid commit: ${commit}`)
  for (const { dir } of PLUGINS) {
    const atCommit = git(['ls-tree', '--name-only', commit, dir])
    if (atCommit !== dir && atCommit !== `${dir}/`) throw new Error(`${dir} is not in commit ${commit}`)
  }

  const index = buildIndex({ repo: args.repo, commit })
  const problems = checkShape(index)
  if (problems.length > 0) throw new Error(problems.join('\n'))
  writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`)
  console.log(`wrote index.json: ${index.plugins.length} plugins at ${commit}`)
}

main()
