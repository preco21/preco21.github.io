const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.config');

const host = '0.0.0.0';
const port = process.env.PORT || 3000;
const url = `http://localhost:${port}`;

const config = webpackConfig({
  dev: true,
  report: true,
});

const devServerConfig = {
  inline: true,
  hotOnly: true,
  historyApiFallback: true,
  overlay: {
    errors: true,
  },
  stats: {
    colors: true,
  },
  host,
  port,
};

WebpackDevServer.addDevServerEntrypoints(config, devServerConfig);

const devServer = new WebpackDevServer(webpack(config), devServerConfig);
devServer.listen(port, host, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return;
  }

  // eslint-disable-next-line no-console
  console.log(`> Ready on ${url}`);
});
