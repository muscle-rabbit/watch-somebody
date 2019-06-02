const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        loader: 'ts-loader',
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        options: {
          configFile: 'tsconfig.json'
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@atoms': path.resolve(__dirname, 'src/components/atoms'),
      '@molecules': path.resolve(__dirname, 'src/components/molecules')
    }
  },
  output: {
    path: path.resolve(__dirname, '../server/service/static')
  },
  plugins: [
    new htmlWebpackPlugin({
      template: 'index.html'
    }),

    new MomentLocalesPlugin({
      localesToKeep: ['es-us', 'ru']
    })
  ]
};
