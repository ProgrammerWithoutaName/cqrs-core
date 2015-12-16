'use strict';

const gulp = require('gulp');
const Server = require('karma').Server;

const config = require('../config');

gulp.task('unit:teamcity', function (done) {
    let server = new Server(config.test.karmaConf.teamcity, done);
    server.start();
});
