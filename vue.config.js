module.exports = {
  devServer: {
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/v1': {
        target: 'http://localhost:8080', // local
        ws: true,
        changeOrigin: true,
      },
      '/admin': {
        target: 'http://localhost:8080', // local
        ws: true,
        changeOrigin: true,
      },
    },
  },

  pluginOptions: {},
};
