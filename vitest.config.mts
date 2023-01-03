import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['./test/*.test.ts'],
    coverage: {
      provider: 'c8',
    },
  },
});
