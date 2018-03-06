var template = require('./repos-list.html');
require('./repos-list.scss');

var reposList = {
  bindings: {
    repos: '<',
  },
  templateUrl: template,
};

module.exports = reposList;
