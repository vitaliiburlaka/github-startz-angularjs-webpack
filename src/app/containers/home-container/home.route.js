function homeRoute($stateProvider) {
  'ngInject';

  $stateProvider.state('root.home', {
    url: '/',
    views: {
      'Content@root': {
        template:
          '<home-container popular-repos-data="$resolve._popularReposData"></home-container>',
      },
    },
    resolve: {
      _popularReposData: function(GithubApiService) {
        'ngInject';

        return GithubApiService.fetchPopularRepos('all').then(function(data) {
          return data;
        });
      },
    },
  });
}

module.exports = homeRoute;
