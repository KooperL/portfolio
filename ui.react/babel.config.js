module.exports = function (api) {
  api.cache(true)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
          useBuiltIns: 'entry',
        },
      ],
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
    extends: './tsconfig.json',
  }
}
