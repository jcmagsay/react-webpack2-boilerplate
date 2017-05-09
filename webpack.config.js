const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  'devtool': 'source-map',
  'entry': './src/index.js',
  'output': {
    'path': path.resolve('public/assets'),
    'publicPath': process.env.NODE_ENV === 'production' ? '/assets/' : '/',
    'filename': 'bundle.js'
  },
  'module': {
    'rules': [
      {
        'test': /\.js$/,
        'exclude': [/node_modules/],
        'use': [{
          'loader': 'babel',
          'options': { presets: ['es2015'] }
        }]
      },
      {
        'test': /\.jsx$/,
        'use': [{
          'loader': 'babel'
        }],
        'exclude': /node_modules/
      },
      {
        'test': /\.(sass|scss)$/,
        'exclude': /node_modules/,
        'use': ExtractTextPlugin.extract(
          ['css', 'postcss', 'sass']
        )
      }
    ]
  },
  'resolve': {
    'alias': {
      'styles': path.resolve(__dirname, './src/assets/styles'),
      'client': path.resolve(__dirname, './src/client'),
      'components': path.resolve(__dirname, './src/client/components'),
      'layout': path.resolve(__dirname, './src/client/layout'),
      'pages': path.resolve(__dirname, './src/client/pages'),
      'routes': path.resolve(__dirname, './src/routes')
    },
    'extensions': ['.js', '.json', '.jsx', '.scss']
  },
  'resolveLoader': {
    'moduleExtensions': ['-loader']
  },
  'plugins': [
    HtmlWebpackPluginConfig,
    new ExtractTextPlugin({ filename: '[name].css', allChunks: true }),
    new webpack.LoaderOptionsPlugin({
      'options': {
        'postcss': [
          autoprefixer({
            'browsers': ['last 3 versions', '> 1%', 'IE >= 11']
          })
        ]
      }
    })
  ],
  'devServer': {
    'historyApiFallback': true
  }
}
