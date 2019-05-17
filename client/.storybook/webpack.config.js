const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

// module.exports = (baseConfig, env, config) => {
//   config.module.rules.push({
//     test: /\.tsx?$/,
//     exclude: /node_modules/,
//     include: [/stories/, /components/],
//     loader: 'ts-loader'
//   });
//   config.resolve.extensions.push('.ts', '.tsx');
//   config.resolve.alias['@atoms'] = path.resolve(
//     __dirname,
//     '../src/components/atoms'
//   );
//   config.resolve.alias['@molecules'] = path.resolve(
//     __dirname,
//     '../src/components/molecules'
//   );

//   return config;
// };

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: [/stories/, /components/],
        loader: 'ts-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: ['es-us', 'ru']
    })
  ]
};
