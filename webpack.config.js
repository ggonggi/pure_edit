const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {

  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true // Enable/disable multi-process parallel running.
      })
    ]
  },
  //plugins: [new CompressionPlugin()]

};