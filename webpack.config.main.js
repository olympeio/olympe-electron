const path = require('path');
const webpack = require('webpack');

const mode = process.env.NODE_ENV || "development";
const staticPath = mode === "production" ? "`${path.join(process.resourcesPath, 'static')}`" : "'static'";

module.exports = {
  mode,
  target: 'electron-main',
  devtool: 'cheap-module-source-map',
  entry: './src/electron.js',
  output: {
    globalObject: 'this',
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '',
    clean: true
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.(m|j|t)s$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ '__static': staticPath }),
  ],
  resolve: {
    extensions: ['.js']
  }
};