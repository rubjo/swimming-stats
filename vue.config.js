module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/swimming-stats/'
    : '/',
  devServer: {
    compress: true,
    disableHostCheck: true
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config
        .output
        .filename('[name].[hash].js')
        .end()
    }
  }
}
