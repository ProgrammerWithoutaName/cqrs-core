'use strict';
const path = require('path');

module.exports = config => {
  config.set({
    browserNoActivityTimeout: 60000,
    basepath: '',
    frameworks: ['jasmine'],
    preprocessors: {
      'source/**/*.js': ['webpack']
    },
    browsers: ['PhantomJS'],
    reporters: ['Progress'],
    autowatch: true,
    proxies: {'/': 'http://localhost:9876/'},
    urlRoot: '/__karma__/',
    files: [
      'node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js',
      'source/index.js',
      {pattern: 'source/**/*.spec.js'}
    ],
    // optionally, configure the reporter
    coverageReporter: {
      type: 'html',
      dir: path.join(__dirname, './coverage')
    },
    webpack: {
      devtool: '#inline-source-map',
      watch: true,
      watchOptions: {
        aggregateTimeout: 500,
        poll: 1000
      },
      output: {
        path: path.join(__dirname, './build'),
        filename: 'bundle.js',
        chunkFilename: '[id].[hash].bundle.js'
      },
      resolve: {
        extensions: ['', '.es6', '.js'],
        root: [
          path.join(__dirname, 'source'),
          path.join(__dirname, 'node_modules')
        ],
        alias: {}
      },
      module: {
        preLoaders: [
          {
            test: /\.js$/,
            loader: 'eslint-loader',
            include: [path.join(__dirname, 'source')]
          }
        ],
        loaders: [
          {
            test: /\.js?$/,
            loader: 'babel',
            query: {
              cacheDirectory: true,
              presets: ['es2015']
            }
          }
        ]
      },
      plugins: [],
      info: false
    }

  });
};