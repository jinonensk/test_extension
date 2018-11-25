module.exports = {
  css: {
    extract: false,
  },
  chainWebpack: (config) => {
    if (config.plugins.has('extract-css')) {
      const extractCSSPlugin = config.plugin('extract-css');
      extractCSSPlugin && extractCSSPlugin.tap(() => [{
        filename: 'css/[name].css',
        chunkFilename: 'css/[name].css',
      }]);
    }
    const imagesRule = config.module.rule('images');
    imagesRule.uses.clear();
    config.module.rule('svg').uses.clear();
    config.module.rule('fonts').uses.clear();
  },
  configureWebpack: {
    entry: {
      background: './src/background/background.entry.js',
      popup: './src/popup/popup.entry.js',
      content: './src/content/content.entry.js',
    },
    output: {
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js',
    },
    optimization: {
      minimize: true,
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg|ttf|woff)(\?.*)?$/,
          loader: 'url-loader',
          query: {
            limit: 500000,
          },
        },
      ],
    },
  },
};
