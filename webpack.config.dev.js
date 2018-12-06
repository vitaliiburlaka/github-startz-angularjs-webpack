'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackDevServerConfig = require('./webpackDevServer.config');

// Always serve from the root in development.
const publicPath = '/';
const appSrc = path.resolve(__dirname, './src');
const appIndexJs = './src/index.js';
const appIndexHtml = 'public/index.html';

// Style files regexes
const cssRegex = /\.css$/;
const sassRegex = /\.(scss|sass)$/;

// Common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
        ],
      },
    },
  ];
  if (preProcessor) {
    loaders.push(require.resolve(preProcessor));
  }
  return loaders;
};

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: ['@babel/polyfill', appIndexJs],
  output: {
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath,
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: function(info) {
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/');
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules'), appSrc],
    extensions: ['.js', '.json', '.css', '.scss', '.html'],
    alias: {
      // Alias to the assets folder for easy "import"
      assets: path.resolve(__dirname, 'src/assets/'),
    },
  },
  module: {
    strictExportPresence: true,
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },
      {
        test: /src.*\.js$/,
        include: appSrc,
        loader: require.resolve('babel-loader'),
      },
      {
        test: cssRegex,
        use: getStyleLoaders({
          importLoaders: 1,
        }),
      },
      {
        test: sassRegex,
        use: getStyleLoaders({ importLoaders: 2 }, 'sass-loader'),
      },
      {
        test: /\.(jpg?g|png|gif|svg)$/i,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(otf|ttf|woff|woff2)$/,
        use: [
          {
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            // Compiles all html to js as AngularJS $templateCache
            loader: require.resolve('ngtemplate-loader'),
            options: {
              relativeTo: appSrc,
            },
          },
          'html-loader',
        ],
        // Excludes index.html as shouldn't be in $templateCache
        exclude: /index.html/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: appIndexHtml,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  devServer: webpackDevServerConfig,
};
