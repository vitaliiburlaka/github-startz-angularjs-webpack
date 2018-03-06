'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// Always serve from the root in development. This makes config easier.
var publicPath = '/';
var appSrc = path.resolve(__dirname, './src');

// Defining config as a `function` allow us to pass the `env` argument
// which gives us access to the command-line params
module.exports = function() {
  var config = {
    devtool: 'cheap-module-source-map',
    entry: {
      app: './src/index.js',
    },
    output: {
      // Add /* filename */ comments to generated require()s in the output.
      pathinfo: true,
      filename: 'static/js/bundle.js',
      chunkFilename: 'static/js/[name].chunk.js',
      // This is the URL that app is served from. We use "/" in development.
      publicPath: publicPath,
      // Point sourcemap entries to original disk location (format as URL on Windows)
      devtoolModuleFilenameTemplate: function(info) {
        path.resolve(info.absoluteResourcePath).replace(/\\/g, '/');
      },
    },
    resolve: {
      modules: [appSrc, path.resolve(__dirname, 'node_modules')],
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
          use: [
            // This loader parallelizes code compilation
            require.resolve('thread-loader'),
            // Add AngularJS DI annotations
            require.resolve('ng-annotate-loader'),
          ],
          exclude: [/[/\\\\]node_modules[/\\\\]/],
        },
        {
          test: /\.css$/,
          use: [require.resolve('style-loader'), require.resolve('css-loader')],
        },
        {
          test: /\.scss$/,
          use: [
            require.resolve('style-loader'),
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
        },
        {
          test: /\.(jpg?g|png|gif|svg)$/i,
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
      }),
      // Add module names to factory functions so they appear in browser profiler.
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        IS_PROD: JSON.stringify(process.env.NODE_ENV === 'production'),
      }),
    ],
    devServer: {
      compress: true,
      clientLogLevel: 'none',
      contentBase: publicPath,
      watchContentBase: true,
      hot: true,
      publicPath: publicPath,
      overlay: false,
      historyApiFallback: {
        disableDotRule: true,
      },
    },
    // No need for hints during development, because we don't do any optimization
    performance: {
      hints: false,
    },
  };

  return config;
};
