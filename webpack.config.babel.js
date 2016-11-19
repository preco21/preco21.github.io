import {join} from 'path';
import {
  LoaderOptionsPlugin,
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
  NoErrorsPlugin,
  optimize,
} from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin, {extract} from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const {
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
      ...(dev ? ['react-hot-loader/patch'] : []),
      'babel-polyfill',
      './src',
    ],
    output: {
      path: join(__dirname, appTarget),
      filename: `js/bundle${dev ? '' : '.[chunkhash]'}.js`,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: join(__dirname, 'src'),
          loader: 'babel-loader',
          options: {
            cacheDirectory: dev,
          },
        },
        {
          test: /\.css$/,
          include: join(__dirname, 'src'),
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
      new CleanWebpackPlugin(cleanTarget),
      new CopyWebpackPlugin(copyTarget),
      new HTMLWebpackPlugin({
        template: 'templates/index.ejs',
        inject: false,
      }),
      ...(dev
        ? [
          new HotModuleReplacementPlugin(),
          new NamedModulesPlugin(),
          new NoErrorsPlugin(),
        ]
        : [
          new DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify('production'),
            },
          }),
          new ExtractTextPlugin({
            filename: `css/style${dev ? '' : '.[contenthash]'}.css`,
            disable: false,
            allChunks: true,
          }),
          new UglifyJsPlugin({
            sourceMap: true,
            mangle: true,
            compress: {
              warnings: false,
            },
          }),
          // backward compatibility
          new LoaderOptionsPlugin({
            minimize: !dev,
            debug: dev,
            options: {
              context: __dirname,
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
