const path = require('path')
const cheerio = require("cheerio");
const PrerenderSpaPlugin = require('prerender-spa-plugin-next');
const PuppeteerRenderer = require("@prerenderer/renderer-puppeteer");

module.exports = {
  devServer: {
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/v1': {
        target: 'https://api.plantslang.com/', // local
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
  transpileDependencies: [
    'vue-meta',
  ],
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new PrerenderSpaPlugin({
        staticDir: config.output.path,
        routes: ["/", "/home"],
        renderer: PuppeteerRenderer,
        postProcess(context) {
          if (context.route === "/404") {
            context.outputPath = path.join(config.output.path, "/404.html");
          }
    
          // Add 'data-server-rendered' attribute so app knows to hydrate with any changes
          const $ = cheerio.load(context.html);
          $("#app").attr("data-server-rendered", "true");
          context.html = $.html();
    
          return context;
        },
      }),);
    }
  },
  pluginOptions: {},
};
