import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Custom Vite plugin to inject unique build timestamp into Service Worker
 * without requiring any third-party dependencies.
 */
function injectServiceWorkerVersion() {
  return {
    name: 'inject-sw-version',
    apply: 'build',
    closeBundle() {
      const swPath = path.resolve(__dirname, 'dist', 'service-worker.js');
      if (fs.existsSync(swPath)) {
        let content = fs.readFileSync(swPath, 'utf8');
        const buildVersion = `v-${Date.now()}`;
        content = content.replace(/__SW_VERSION__/g, buildVersion);
        fs.writeFileSync(swPath, content, 'utf8');
        console.log(`[SW Plugin] Injected build cache version: ${buildVersion}`);
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), injectServiceWorkerVersion()],
});
