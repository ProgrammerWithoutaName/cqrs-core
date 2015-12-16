'use strict';

var configConstants = require('./configConstants');

module.exports = {
    'karma': configConstants.karmaConfigFile,
    'protractor': 'test/protractor.conf.js',
    'karmaConf': {
        'unit': {
            'configFile': configConstants.karmaConfigFile,
            'action': 'run'
        },
        'dev': {
            'configFile': configConstants.karmaConfigFile,
            'browsers': ['PhantomJS', 'Chrome'],
            'reporters': ['html', 'growl', 'mocha'],
            'action': 'watch',
            'singleRun': false
        },
        'teamcity': {
            'configFile': configConstants.karmaConfigFile,
            'browsers': ['PhantomJS'],
            'reporters': ['teamcity'],
            'action': 'run',
            'singleRun': true
        },
        'debug': {
            'configFile': configConstants.karmaConfigFile,
            'browsers': ['Chrome'],
            'reporters': ['html', 'growl', 'mocha'],
            'action': 'watch',
            'singleRun': false
        }
    }
};
