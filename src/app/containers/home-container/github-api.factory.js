function GithubApiService($http, $window) {
  'ngInject';

  var service = {};

  service.fetchPopularRepos = function(language) {
    var encodedURI = $window.encodeURI(
      'https://api.github.com/search/repositories?q=stars:>1+language:' +
        language.toLowerCase() +
        '&sort=stars&order=desc&type=Repositories'
    );

    return $http
      .get(encodedURI)
      .then(function(response) {
        return response.data.items;
      })
      .catch(function(error) {
        console.warn(error);
        return null;
      });
  };

  return service;
}

module.exports = GithubApiService;
