import template from './repos-list.html';
import './repos-list.scss';

const reposList = {
  bindings: {
    repos: '<',
  },
  templateUrl: template,
};

export default reposList;
