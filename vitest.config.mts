import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['./test/**/*.test.ts'],
    benchmark: {
      include: ['./bench/**/*.bench.ts'],
    },
    typecheck: {
      enabled: true,
      include: ['./test/**/*.test-d.ts'],
    },
    coverage: {
      provider: 'v8',
    },
  },
});
