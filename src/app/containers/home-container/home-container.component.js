var template = require('./home-container.html');
require('./home-container.scss');

var homeContainer = {
  bindings: {
    popularReposData: '<',
  },
  templateUrl: template,
  controller: function(GithubApiService) {
    'ngInject';

    var ctrl = this;
    ctrl.languages = [
      'All',
      'JavaScript',
      'TypeScript',
      'Java',
      'Python',
      'Ruby',
    ];
    ctrl.selectedLanguage = 'All';
    ctrl.repos = null;

    ctrl.$onInit = function() {
      ctrl.repos = ctrl.popularReposData;
    };

    ctrl.onSelect = function(lang) {
      ctrl.selectedLanguage = lang;
      updateLanguage(lang);
    };

    function updateLanguage(lang) {
      GithubApiService.fetchPopularRepos(lang).then(function(data) {
        ctrl.repos = data;
      });
    }
  },
};

module.exports = homeContainer;
