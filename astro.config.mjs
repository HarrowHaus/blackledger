import { defineConfig } from 'astro/config';

// THE BLACK LEDGER — static, multi-page, no backend, no integrations.
export default defineConfig({
  site: 'https://blackledger.donald-dcd.workers.dev',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  devToolbar: { enabled: false },
});
