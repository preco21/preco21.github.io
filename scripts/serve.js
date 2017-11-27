const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const opn = require('opn');
const webpackConfig = require('../webpack.config');

const host = 'localhost';
const port = process.env.PORT || 3000;
const url = `http://${host}:${port}/`;

const config = webpackConfig({dev: true, devServer: url});
const devServer = new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true,
  overlay: {
    errors: true,
  },
  stats: {
    colors: true,
  },
});

devServer.listen(port, host, async (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return;
  }

  // eslint-disable-next-line no-console
  console.log(`Listening at ${url}`);
  await opn(url);
});
