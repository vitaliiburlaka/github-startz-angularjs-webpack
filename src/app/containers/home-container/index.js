import { module as _module } from 'angular';
import uiRouter from '@uirouter/angularjs';

import homeRoute from './home.route';
import homeContainer from './home-container.component';
import GitHubApiService from './github-api.factory';

import languagesListComponent from '../../components/home/languages-list';
import repoListComponent from '../../components/home/repos-list';

export default _module('app.home', [
  uiRouter,
  languagesListComponent,
  repoListComponent,
])
  .config(homeRoute)
  .component('homeContainer', homeContainer)
  .factory('GitHubApiService', GitHubApiService).name;
