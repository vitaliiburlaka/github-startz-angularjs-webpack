var angular = require('angular');

var reposList = require('./repos-list.component');
var rolloverDirective = require('./rollover.directive');

module.exports = angular
  .module('reposList.component', [])
  .component('reposList', reposList)
  .directive('rollover', rolloverDirective).name;
