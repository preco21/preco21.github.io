import {resolve} from 'path';
import {
  DefinePlugin,
  LoaderOptionsPlugin,
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
  NoEmitOnErrorsPlugin,
  optimize,
} from 'webpack';
import HTMLPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin, {extract} from 'extract-text-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';
import OfflinePlugin from 'offline-plugin';

const {
  UglifyJsPlugin,
} = optimize;

const src = 'src';
const dest = 'app';
const clean = [dest];
const copy = [
  {
    from: 'content',
  },
];

function config({dev = false} = {}) {
  if (dev) {
    process.env.NODE_ENV = 'development';
  }

  return {
    devtool: dev ? 'eval-source-map' : 'hidden-source-map',
    entry: [
      ...(dev ? ['react-hot-loader/patch'] : []),
      'babel-polyfill',
      `./${src}`,
    ],
    output: {
      path: resolve(__dirname, dest),
      filename: `bundle${dev ? '' : '.[chunkhash]'}.js`,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: resolve(__dirname, src),
          loader: 'babel-loader',
          options: {
            cacheDirectory: dev,
          },
        },
        {
          test: /\.css$/,
          include: resolve(__dirname, src),
          ...(dev
            ? {
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: true,
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]',
                  },
                },
              ],
            }
            : {
              loader: extract({
                fallbackLoader: 'style-loader',
                loader: 'css-loader',
                query: {
                  sourceMap: true,
                  modules: true,
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                },
              }),
            }),
        },
      ],
    },
    plugins: [
      new CleanPlugin(clean),
      new CopyPlugin(copy),
      new HTMLPlugin({
        template: `${src}/template.ejs`,
        inject: false,
      }),
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(dev ? 'development' : 'production'),
      }),
      new LoaderOptionsPlugin({
        minimize: !dev,
        debug: dev,
        options: {
          context: __dirname,
        },
      }),
      ...(dev
        ? [
          new HotModuleReplacementPlugin(),
          new NamedModulesPlugin(),
          new NoEmitOnErrorsPlugin(),
        ]
        : [
          new ExtractTextPlugin({
            filename: `style${dev ? '' : '.[contenthash]'}.css`,
            allChunks: true,
          }),
          new UglifyJsPlugin({
            sourceMap: true,
            comments: false,
          }),
          new OfflinePlugin(),
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
