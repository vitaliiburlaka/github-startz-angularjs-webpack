'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

var publicPath = '/';
var buildPath = path.resolve(__dirname, 'dist');
var appSrc = path.resolve(__dirname, './src');
var shouldUseSourceMap = process.env.NODE_ENV !== 'production';

// Defining config as a `function` allow us to pass the `env` argument
// which gives us access to the command-line params
module.exports = function(env) {
  var config = {
    // Stops attempts to continue if there are any errors.
    bail: true,
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
        {
          test: /src.*\.js$/,
          include: appSrc,
          use: [
            // Add AngularJS DI annotations
            require.resolve('ng-annotate-loader'),
          ],
          // exclude: [/[/\\\\]node_modules[/\\\\]/],
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: require.resolve('style-loader'),
            use: require.resolve('css-loader'),
          }),
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallback: require.resolve('style-loader'),
            use: [
              {
                loader: require.resolve('css-loader'),
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  sourceMap: true,
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('sass-loader'),
                options: {
                  outputStyle: 'expanded',
                  sourceMap: true,
                  sourceMapContents: true,
                  // Allow easy "@import" some core styles like variables from anywhere in the app
                  includePaths: [path.resolve(__dirname, './src/assets/scss')],
                },
              },
            ],
          }),
        },
        {
          test: /\.(jpg|png|gif|svg)$/i,
          use: [
            {
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000,
                name: 'static/images/[name].[hash:8].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(otf|ttf|woff|woff2)$/,
          use: [
            {
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000,
                name: 'static/fonts/[name].[hash:8].[ext]',
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
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          comparisons: false,
          screw_ie8: true,
        },
        mangle: {
          safari10: true,
        },
        output: {
          comments: false,
          ascii_only: true,
        },
        sourceMap: shouldUseSourceMap,
      }),
      new ExtractTextPlugin({
        filename: 'static/css/[name].[chunkhash:8].bundle.css',
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'static/js/[name].[chunkhash:8].bundle.js',
        // Second argument is module use `count`
        minChunks: function(module) {
          var context = module.context;
          return context && context.indexOf('node_modules') >= 0;
        },
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        IS_PROD: JSON.stringify(process.env.NODE_ENV === 'production'),
      }),
    ],
  };

  if (env && env.analyze) {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      })
    );
  }

  return config;
};
