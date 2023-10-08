import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  compilerOptions: {
    cssHash: ({ css, hash }) => `_${hash(css)}`,
  },
};
