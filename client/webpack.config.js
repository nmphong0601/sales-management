const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  entry: ['webpack/hot/dev-server', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      containers: path.resolve(__dirname, 'src/containers/'),
      components: path.resolve(__dirname, 'src/components/'),
      common: path.resolve(__dirname, 'src/common/'),
      pages: path.resolve(__dirname, 'src/pages/'),
      services: path.resolve(__dirname, 'src/services/'),
      actions: path.resolve(__dirname, 'src/actions/'),
      reducers: path.resolve(__dirname, 'src/reducers/'),
      process: 'process/browser',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
    ],
  },
  devServer: {
    hot: true,
    compress: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true, // Allow refreshing of the page
    server: {
      type: 'https',
      options: {
        key: fs.readFileSync('cert.key'),
        cert: fs.readFileSync('cert.crt'),
        ca: fs.readFileSync('ca.crt'),
        passphrase: 'webpack-dev-server',
      },
    },
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   templateContent: ({ htmlWebpackPlugin }) =>
    //     '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' +
    //     htmlWebpackPlugin.options.title +
    //     '</title></head><body><div id="app"></div></body></html>',
    //   filename: "index.html",
    // }),
    new Dotenv(),
    new HtmlWebpackPlugin({
      title: 'FE App',
      template: path.resolve(__dirname, 'public', 'index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin(),
    new InterpolateHtmlPlugin({ PUBLIC_URL: '/public' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};

module.exports = (env, argv) => {
  if (argv.hot) {
    // Cannot use 'contenthash' when hot reloading is enabled.
    config.output.filename = "[name].[hash].js";
  }

  return config;
};
