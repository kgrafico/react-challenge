module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    [
      require("@babel/plugin-proposal-decorators").default,
      {
         legacy: true
      }
   ],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    "@babel/plugin-proposal-object-rest-spread"
  ],
  env: {
    production: {
      only: ['src'],
      plugins: [
        [
          require("@babel/plugin-proposal-decorators").default,
          {
             legacy: true
          }
       ],
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
      ]
    }
  }
};
