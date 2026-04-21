import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'

const processes = [
  spawn(npmCommand, ['run', 'dev:server'], {
    cwd: projectRoot,
    stdio: 'inherit',
    shell: false,
  }),
  spawn(npmCommand, ['run', 'dev', '--', '--host'], {
    cwd: projectRoot,
    stdio: 'inherit',
    shell: false,
  }),
]

const shutdown = () => {
  for (const child of processes) {
    if (!child.killed) {
      child.kill()
    }
  }
}

for (const child of processes) {
  child.on('exit', (code) => {
    if (code && code !== 0) {
      shutdown()
      process.exit(code)
    }
  })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
