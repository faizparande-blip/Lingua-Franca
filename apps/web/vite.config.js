import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Custom Vite plugin to inject a unique build-time cache version into dist/sw.js.
 * This guarantees that every GitHub push and Vercel deployment produces a
 * byte-different Service Worker file, ensuring instant browser update detection.
 */
function pwaVersioningPlugin() {
  return {
    name: 'pwa-versioning',
    apply: 'build',
    closeBundle() {
      const swDistPath = path.resolve(__dirname, 'dist/sw.js')
      if (fs.existsSync(swDistPath)) {
        const buildTimestamp = Date.now()
        const buildId = `lf-v${buildTimestamp.toString(36)}`
        let content = fs.readFileSync(swDistPath, 'utf8')
        content = content.replace(/__SW_VERSION__/g, buildId)
        fs.writeFileSync(swDistPath, content, 'utf8')
        console.log(`[PWA Build Plugin] Injected Service Worker Cache Version: ${buildId}`)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), pwaVersioningPlugin()],
})
