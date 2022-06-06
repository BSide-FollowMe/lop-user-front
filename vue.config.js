module.exports = {
  devServer: {
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/v1': {
        target: 'https://dev-api.plantslang.com/', // local
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
  transpileDependencies: ['vue-meta'],
};
