const {resolve} = require('path');
const {
  optimize: {ModuleConcatenationPlugin},
  DefinePlugin,
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
  NoEmitOnErrorsPlugin,
} = require('webpack');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const BabelMinifyPlugin = require('babel-minify-webpack-plugin');
const OptimizeJSPlugin = require('optimize-js-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const {extract} = ExtractTextPlugin;

const src = 'src';
const dest = 'app';
const clean = [dest];
const copy = [
  {
    from: 'static',
  },
];

function config({report, dev, devServer} = {}) {
  const env = dev ? 'development' : 'production';

  return {
    devtool: dev ? 'eval-source-map' : 'hidden-source-map',
    entry: [
      ...dev
        ? [
          `webpack-dev-server/client?${devServer}`,
          'webpack/hot/only-dev-server',
          'react-hot-loader/patch',
        ]
        : [],
      `./${src}/index.jsx`,
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
            forceEnv: env,
          },
        },
        {
          test: /\.css$/,
          include: resolve(__dirname, src),
          use: dev
            ? [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  modules: true,
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                },
              },
            ]
            : extract({
              fallback: 'style-loader',
              use: {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  modules: true,
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                },
              },
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
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
        },
      }),
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env),
      }),
      ...dev
        ? [
          new HotModuleReplacementPlugin(),
          new NamedModulesPlugin(),
          new NoEmitOnErrorsPlugin(),
          new BundleAnalyzerPlugin({
            analyzerHost: '0.0.0.0',
            openAnalyzer: false,
          }),
        ]
        : [
          new ModuleConcatenationPlugin(),
          new BabelMinifyPlugin(),
          new OptimizeJSPlugin(),
          new ExtractTextPlugin({
            filename: 'style.[contenthash].css',
            allChunks: true,
          }),
          ...report
            ? [
              new BundleAnalyzerPlugin({
                analyzerMode: 'static',
              }),
            ]
            : [],
          new OfflinePlugin(),
        ],
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },
  };
}

module.exports = config;
