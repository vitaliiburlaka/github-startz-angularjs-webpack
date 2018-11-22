var angular = require('angular');
var uiRouter = require('@uirouter/angularjs').default;

var homeRoute = require('./home.route');
var homeContainer = require('./home-container.component');
var GithubApiService = require('./github-api.factory');

var languagesListComponent = require('../../components/home/languages-list');
var repoListComponent = require('../../components/home/repos-list');

module.exports = angular
  .module('app.home', [uiRouter, languagesListComponent, repoListComponent])
  .config(homeRoute)
  .component('homeContainer', homeContainer)
  .factory('GithubApiService', GithubApiService).name;
