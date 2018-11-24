'use strict';

var path = require('path');
var webpack = require('webpack');
var TerserPlugin = require('terser-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var safePostCssParser = require('postcss-safe-parser');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

var publicPath = '/';
var buildPath = path.resolve(__dirname, 'dist');
var appSrc = path.resolve(__dirname, './src');
var shouldUseSourceMap = process.env.NODE_ENV !== 'production';
var isEnvProduction = process.env.NODE_ENV === 'production';

// Style files regexes
var cssRegex = /\.css$/;
var sassRegex = /\.(scss|sass)$/;

// Common function to get style loaders
var getStyleLoaders = function(cssOptions, preProcessor) {
  var loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        ident: 'postcss',
        plugins: function() {
          return [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
          ];
        },
        sourceMap: shouldUseSourceMap,
      },
    },
  ];
  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: shouldUseSourceMap,
      },
    });
  }
  return loaders;
};

module.exports = function(env) {
  var config = {
    mode: 'production',
    // Stop compilation early in production
    bail: isEnvProduction,
    devtool: shouldUseSourceMap ? 'source-map' : false,
    entry: {
      app: './src/index.js',
    },
    output: {
      path: buildPath,
      filename: 'static/js/[name].[chunkhash:8].js',
      chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
      publicPath: publicPath,
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              ascii_only: true,
            },
          },
          // Use multi-process parallel running to improve the build speed
          parallel: true,
          // Enable file caching
          cache: true,
          sourceMap: shouldUseSourceMap,
        }),
        // This is only used in production mode
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: shouldUseSourceMap
              ? {
                  // Forces the sourcemap to be output into a separate file
                  inline: false,
                  // Appends the sourceMappingURL to the end of the css file
                  annotation: true,
                }
              : false,
          },
        }),
      ],
      splitChunks: {
        chunks: 'all',
      },
    },
    resolve: {
      modules: [path.resolve(__dirname, 'node_modules'), appSrc],
      extensions: ['.js', '.css', '.json', '.scss', '.html'],
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
          use: [
            // Add AngularJS DI annotations
            require.resolve('ng-annotate-loader'),
          ],
        },
        {
          test: cssRegex,
          loader: getStyleLoaders({
            importLoaders: 1,
            sourceMap: shouldUseSourceMap,
          }),
          sideEffects: true,
        },
        {
          test: sassRegex,
          loader: getStyleLoaders(
            {
              importLoaders: 2,
              sourceMap: shouldUseSourceMap,
            },
            'sass-loader'
          ),
          sideEffects: true,
        },
        {
          test: /\.(jpg|png|gif|svg)$/i,
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
            require.resolve('html-loader'),
          ],
          // Excludes index.html as shouldn't be in $templateCache
          exclude: /index.html/,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: 'public/index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        IS_PROD: JSON.stringify(process.env.NODE_ENV === 'production'),
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
      env &&
        env.analyze &&
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
        }),
    ].filter(Boolean),
  };

  return config;
};
