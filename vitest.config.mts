import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    benchmark: {
      include: ['./bench/**/*.bench.ts'],
    },
    environment: 'jsdom',
    include: ['./test/**/*.test.ts'],
    coverage: {
      all: false,
      provider: 'v8',
    },
  },
});
