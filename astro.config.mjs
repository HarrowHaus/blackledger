import { defineConfig } from 'astro/config';

// THE BLACK LEDGER — static, multi-page, no backend, no integrations.
export default defineConfig({
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  devToolbar: { enabled: false },
});
