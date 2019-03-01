const path = require('path')

const appPublic = path.resolve(__dirname, 'public')

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'

module.exports = {
  compress: true,
  clientLogLevel: 'none',
  contentBase: appPublic,
  watchContentBase: true,
  hot: true,
  publicPath: '/',
  https: protocol === 'https',
  overlay: false,
  historyApiFallback: {
    disableDotRule: true,
  },
}
