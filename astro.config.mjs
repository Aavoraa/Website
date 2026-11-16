// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://aavoraa.com',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  compressHTML: true,
  devToolbar: { enabled: false },
  // pages merged into others; old links still land on the right place
  redirects: { '/approach': '/about/', '/industries': '/#industries', '/work': '/insights/#case-studies' },
});
