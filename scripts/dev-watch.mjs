/**
 * 开发期 watch：改代码后自动编译，快速反映到 dsh web。
 *
 * - host 层（src/*.ts）：tsc -w 持续编译到 lib/。改 host 后仍需重启 dsh web。
 * - UI 层（src/client.js）：监听变化，自动复制到 lib/client.js。改 UI 后刷新浏览器即可。
 *
 * 用法：npm run dev
 */
import { spawn } from 'node:child_process'
import { watch, copyFileSync, rmSync, mkdirSync, cpSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const srcDir = join(root, 'src')
const libDir = join(root, 'lib')

function ensureLib() {
  // 首次把 src/client.js 复制进 lib，保证 dsh 能加载最新 client。
  // （tsc 会生成 lib/*.js，但 client.js 是 JS，需要手工复制。）
  mkdirSync(libDir, { recursive: true })
  try {
    cpSync(join(srcDir, 'client.js'), join(libDir, 'client.js'), { force: true })
  } catch { /* ok */ }
}

let clientTimer = null
function copyClient() {
  clearTimeout(clientTimer)
  clientTimer = setTimeout(
    () => {
      try {
        copyFileSync(join(srcDir, 'client.js'), join(libDir, 'client.js'))
        console.log(`[watch] client.js → lib/client.js ${new Date().toLocaleTimeString()}`)
      } catch (e) {
        console.error('[watch] copy client.js failed:', e.message)
      }
    },
    60,
  )
}

console.log(`[watch] root = ${root}`)
ensureLib()
copyClient()

// 1) tsc -w：编译 host TS
const tsc = spawn('npx', ['tsc', '-p', 'tsconfig.json', '--watch'], {
  cwd: root,
  stdio: 'inherit',
  shell: process.platform === 'win32',
})
tsc.on('error', (err) => console.error('[watch] tsc failed to start:', err.message))

// 2) 监听 src/client.js，变化即复制
try {
  const watcher = watch(srcDir, { recursive: false }, (event, filename) => {
    if (filename === 'client.js') copyClient()
  })
  watcher.on('close', () => console.log('[watch] fs.watch closed'))
} catch (err) {
  console.warn('[watch] fs.watch unavailable, fallback to interval polling')
  setInterval(() => {
    // 简单轮询：若源文件 mtime 变化则复制
    // （为简化，直接每次都复制；cp 幂等且开销小）
    copyClient()
  }, 2000)
}

process.on('SIGINT', () => {
  tsc.kill('SIGINT')
  process.exit(0)
})
