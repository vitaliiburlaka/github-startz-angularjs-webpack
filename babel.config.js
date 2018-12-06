module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
  ],
  plugins: [
    ['angularjs-annotate', { explicitOnly: true }],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ],
  env: {
    production: {
      plugins: [
        ['angularjs-annotate', { explicitOnly: true }],
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
      ],
    },
  },
};
