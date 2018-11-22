'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// Always serve from the root in development. This makes config easier.
var publicPath = '/';
var appSrc = path.resolve(__dirname, './src');

// Style files regexes
var cssRegex = /\.css$/;
var sassRegex = /\.(scss|sass)$/;

// Common function to get style loaders
var getStyleLoaders = function(cssOptions, preProcessor) {
  var loaders = [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
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
      },
    },
  ];
  if (preProcessor) {
    loaders.push(require.resolve(preProcessor));
  }
  return loaders;
};

// Defining config as a `function` allow us to pass the `env` argument
// which gives us access to the command-line params
module.exports = function() {
  var config = {
    mode: 'development',
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
          use: [
            // Add AngularJS DI annotations
            require.resolve('ng-annotate-loader'),
          ],
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
      new webpack.HotModuleReplacementPlugin(),
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
  };

  return config;
};
