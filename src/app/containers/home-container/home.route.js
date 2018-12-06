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
      _popularReposData: GitHubApiService => {
        'ngInject';

        return GitHubApiService.fetchPopularRepos('all').then(data => {
          return data;
        });
      },
    },
  });
}

export default homeRoute;
