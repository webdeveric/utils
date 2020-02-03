module.exports = api => {
  const isDev = api.env('development');

  return {
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-private-methods',
    ],
    presets: [
      [
        '@babel/preset-env',
        {
          debug: isDev,
          spec: true,
          useBuiltIns: 'usage',
          targets: {
            node: 'current',
          },
          corejs: 3,
        },
      ],
    ],
  };
};
