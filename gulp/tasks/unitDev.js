'use strict';

const gulp = require('gulp');
const Server = require('karma').Server;

const config = require('../config');

gulp.task('unit:dev', function (done) {
    let server = new Server(config.test.karmaConf.dev, done);
    server.start();
});
