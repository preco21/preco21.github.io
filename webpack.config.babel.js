import {join} from 'path';
import {
  DefinePlugin,
  LoaderOptionsPlugin,
  HotModuleReplacementPlugin,
  optimize,
} from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin, {extract} from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const {
  DedupePlugin,
  UglifyJsPlugin,
} = optimize;

const appTarget = 'app';
const cleanTarget = [
  appTarget,
];
const copyTarget = [
  {
    from: 'contents',
  },
];

function config({dev = false} = {}) {
  if (dev) {
    process.env.BABEL_ENV = 'development';
  }

  return {
    devtool: dev ? 'eval-source-map' : 'hidden-source-map',
    entry: [
      ...(dev
        ? [
          'webpack-dev-server/client?http://localhost:8080',
          'webpack/hot/only-dev-server',
          'react-hot-loader/patch',
        ]
        : []),
      './src/index',
    ],
    output: {
      path: join(__dirname, appTarget),
      filename: `bundle${dev ? '' : '.[chunkhash]'}.js`,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: join(__dirname, 'src'),
          loader: 'babel',
          options: {
            cacheDirectory: dev,
          },
        },
        {
          test: /\.css$/,
          include: join(__dirname, 'src'),
          loader: extract({
            fallbackLoader: 'style',
            loader: 'css?modules&localIdentName=[name]__[local]___[hash:base64:5]',
          }),
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(cleanTarget),
      new ExtractTextPlugin(`style${dev ? '' : '.[contenthash]'}.css`),
      new CopyWebpackPlugin(copyTarget),
      new HTMLWebpackPlugin({
        template: 'templates/index.ejs',
        inject: false,
      }),
      ...(dev
        ? [
          new HotModuleReplacementPlugin(),
        ]
        : [
          new DedupePlugin(),
          new DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify('production'),
            },
          }),
          // backward compatibility
          new LoaderOptionsPlugin({
            minimize: !dev,
            debug: dev,
          }),
          new UglifyJsPlugin({
            sourceMap: true,
            mangle: true,
            compress: {
              warnings: false,
            },
          }),
        ]),
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  };
}

export {
  config as default,
};
