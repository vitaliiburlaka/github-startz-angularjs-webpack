var angular = require('angular');

var languagesList = require('./languages-list.component');

module.exports = angular
  .module('languagesList.component', [])
  .component('languagesList', languagesList).name;
