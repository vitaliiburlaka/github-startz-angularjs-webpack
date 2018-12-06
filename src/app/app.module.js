import { module as _module } from 'angular';
import ngAnimate from 'angular-animate';
import uiRouter from '@uirouter/angularjs';

import APP_CONFIG from './app-config.constant';
import appConfig from './app.config';

import appRoute from './app.route';
import appComponent from './app.component';

import homeModule from './containers/home-container';
import appLoaderModule from './components/common/app-loader';

export default _module('app', [
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
