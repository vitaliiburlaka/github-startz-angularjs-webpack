import { module as _module } from 'angular';

import reposList from './repos-list.component';
import rolloverDirective from './rollover.directive';

export default _module('reposList.component', [])
  .component('reposList', reposList)
  .directive('rollover', rolloverDirective).name;
