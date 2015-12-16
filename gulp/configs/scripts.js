'use strict';
var path = require('path');
var siteBase = require('./configConstants').siteBase;

module.exports = {
    'src': path.join(siteBase.src, 'js/**/*.+(js|es6)'),
    'html': path.join(siteBase.src, 'js/**/*.html'),
    'node_modules': path.join(__dirname, '../../node_modules'),
    'dest': path.join(siteBase.dest, 'js')
};
