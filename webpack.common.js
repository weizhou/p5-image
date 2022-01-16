const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');
 

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'p5image.min.js',
    libraryTarget: 'umd',
  },
  plugins: [
    new WebpackShellPlugin(
      {
        onBuildStart:['echo Webpack Start'], 
        onBuildEnd:['echo start copy bundle file to examples and glimglab',
                    'cp ./dist/p5image.min.js ./examples/lib/.',
                    'cp ./dist/p5image.min.js ../weizhou.github.io/lib/.',
                    'cp ./dist/p5image.min.js ../weizhou.github.io/lab/lib/.',
                    'echo Webpack End']})
  ],
  module: {
    rules: [
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
};


