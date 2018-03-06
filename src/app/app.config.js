function appConfig(
  $locationProvider,
  $logProvider,
  $compileProvider,
  $httpProvider,
  APP_CONFIG
) {
  'ngInject';

  $locationProvider.html5Mode({ enabled: true, requireBase: false });
  $locationProvider.hashPrefix('!');

  // Disable Debug logs
  $logProvider.debugEnabled(!APP_CONFIG.is_prod);

  // Disable Debug Data
  $compileProvider.debugInfoEnabled(!APP_CONFIG.is_prod);

  // Disable comment and css class directives
  $compileProvider.commentDirectivesEnabled(false);
  $compileProvider.cssClassDirectivesEnabled(false);

  // HTTP requests inretceptor
  $httpProvider.interceptors.push(function($q) {
    'ngInject';
    return {
      request: function(config) {
        // Here you could change the request config
        return config;
      },
      responseError: function(rejection) {
        return $q.reject(rejection);
      },
    };
  });
}

module.exports = appConfig;
