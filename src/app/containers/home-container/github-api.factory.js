function GitHubApiService($http, $window) {
  'ngInject';

  const service = {};

  service.fetchPopularRepos = function(language) {
    const encodedURI = $window.encodeURI(
      'https://api.github.com/search/repositories?q=stars:>1+language:' +
        language.toLowerCase() +
        '&sort=stars&order=desc&type=Repositories'
    );

    return $http
      .get(encodedURI)
      .then(response => {
        return response.data.items;
      })
      .catch(error => {
        console.warn(error);
        return null;
      });
  };

  return service;
}

export default GitHubApiService;
