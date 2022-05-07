const path = require('path');
const cheerio = require('cheerio');
const PrerenderSpaPlugin = require('prerender-spa-plugin-next');
const PuppeteerRenderer = require('@prerenderer/renderer-puppeteer');
const pages = require('./pages');

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
  transpileDependencies: ['vue-meta'],
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new PrerenderSpaPlugin({
          staticDir: config.output.path,
          routes: ['/plants', '/guide/water', '/guide/sunlight', '/guide/ventilation', '/guide/blight'],
          renderer: PuppeteerRenderer,
          postProcess(context) {
            if (context.route === '/404') {
              context.outputPath = path.join(config.output.path, '/404.html');
            }

            // Add 'data-server-rendered' attribute so app knows to hydrate with any changes
            const $ = cheerio.load(context.html);
            $('#app').attr('data-server-rendered', 'true');
            context.html = $.html();
            if (context.route.endsWith('.html')) {
              context.outputPath = path.join(__dirname, 'dist', context.route);
            }
            return context;
          },
        })
      );
    }
  },
  pluginOptions: {
    // Optional - Cancel render if it takes more than a certain amount of time
    // useful in combination with renderAfterDocumentEvent as it will avoid waiting infinitely if the event doesn't fire
    timeout: 100000,
  },
};
