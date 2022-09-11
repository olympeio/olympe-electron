const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Copy = require('copy-webpack-plugin');
const webpack = require('webpack');

const mode = process.env.NODE_ENV || "development";
const staticPath = mode === "production" ? "`${path.join(process.resourcesPath, 'static')}`" : "'static'";
const drawPath = path.resolve(__dirname, 'node_modules/@olympeio/draw');

module.exports = {
  mode,
  target: 'electron-renderer',
  devtool: 'cheap-module-source-map',
  entry: './src/olympe/main.js',
  output: {
    globalObject: 'this',
    filename: 'olympe.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: ''
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {test: /\.js$/, enforce: "pre", use: "source-map-loader"},
      {test: /\.js$/, enforce: "pre", use: "webpack-import-glob-loader"},
      {
        test: /\.(js|json|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ["@babel/env", "@babel/react"] }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
        use: ['file-loader'],
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ '__static': staticPath }),
    new MiniCssExtractPlugin({filename: 'css/index.css'}),
    new HtmlWebpackPlugin({template: 'res/index.html'}),
    new Copy({patterns: [
      {from: 'res/oConfig.json', to: 'oConfig.json'},
      {from: 'res/oConfig.json', to: 'conf.d/oConfig.json'},
      {from: drawPath + '/version.json', to: 'version.json'},
      {from: drawPath + '/images', to: 'images'},
      {from: drawPath + '/fonts', to: 'fonts'},
      {from: drawPath + '/css', to: 'css'},
      {from: drawPath + '/doc', to: 'doc'},
  ]})
  ],
  resolve: {
    alias: {
      'olympe': drawPath,
      '@olympeio': path.resolve(__dirname, 'node_modules/@olympeio'),
      '@olympeio-extensions': path.resolve(__dirname, 'node_modules/@olympeio-extensions')
    },
    extensions: ['.js']
  }
}