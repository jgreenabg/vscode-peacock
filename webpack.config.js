//@ts-check

'use strict';

const path = require('path');

/**@type {import('webpack').Configuration}*/
const config = {
  target: 'node',
  entry: './src/extension.ts',
  devtool: 'source-map',
  externals: {
    vscode: 'commonjs vscode'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'extension-node.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../[resource-path]'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  }
};

module.exports = config;
