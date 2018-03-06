var angular = require('angular');
var ngAnimate = require('angular-animate');
var uiRouter = require('angular-ui-router');

require('normalize.css');

var APP_CONFIG = require('./app-config.constant');
var appConfig = require('./app.config');

var appRoute = require('./app.route');
var appComponent = require('./app.component');

var homeModule = require('./containers/home-container');
var appLoaderModule = require('./components/common/app-loader');

angular
  .module('app', [
    ngAnimate,
    uiRouter,

    // App Modules
    homeModule,
    appLoaderModule,
  ])
  .constant('APP_CONFIG', APP_CONFIG)
  .config(appConfig)
  .config(appRoute)
  .component('appComponent', appComponent);
