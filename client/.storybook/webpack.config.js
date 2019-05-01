const path = require('path');

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    include: [/stories/, /components/],
    loader: 'ts-loader'
  });
  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.alias['@atoms'] = path.resolve(
    __dirname,
    '../src/components/atoms'
  );
  config.resolve.alias['@molecules'] = path.resolve(
    __dirname,
    '../src/components/molecules'
  );
  return config;
};

