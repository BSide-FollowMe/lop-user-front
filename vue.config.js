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
        routes: ["/plants"],
        renderer: PuppeteerRenderer,
        postProcess(context) {
          if (context.route === "/404") {
            context.outputPath = path.join(config.output.path, "/404.html");
          }
    
          // Add 'data-server-rendered' attribute so app knows to hydrate with any changes
          const $ = cheerio.load(context.html);
          $("#app").attr("data-server-rendered", "true");
          context.html = $.html();
          if (context.route.endsWith('.html')) {
            context.outputPath = path.join(__dirname, 'dist', context.route)
          }
          return context;
        },
      }),);
    }
  },
  pluginOptions: {
    // Optional - defaults to 0, no limit.
    // Routes are rendered asynchronously.
    // Use this to limit the number of routes rendered in parallel.
    maxConcurrentRoutes: 4,

    // Optional - Wait to render until a certain amount of time has passed.
    // NOT RECOMMENDED
    renderAfterTime: 10000, // Wait 5 seconds.
    // Optional - Cancel render if it takes more than a certain amount of time
    // useful in combination with renderAfterDocumentEvent as it will avoid waiting infinitely if the event doesn't fire
    timeout: 60000, // Cancel render if it takes more than 20 seconds

    // Other puppeteer options.
    // (See here: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions)
    headless: false // Display the browser window when rendering. Useful for debugging.
  },
};
