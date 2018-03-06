var angular = require('angular');

var appLoader = require('./app-loader.component');

module.exports = angular
  .module('appLoader.component', [])
  .component('appLoader', appLoader).name;
