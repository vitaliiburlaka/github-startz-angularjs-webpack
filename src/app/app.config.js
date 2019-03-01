function appConfig(
  $locationProvider,
  $logProvider,
  $compileProvider,
  $httpProvider,
  APP_CONFIG
) {
  'ngInject'
  const { isProd } = APP_CONFIG

  $locationProvider.html5Mode({ enabled: true, requireBase: false })
  $locationProvider.hashPrefix('!')

  // Disable Debug logs
  $logProvider.debugEnabled(!isProd)

  // Disable Debug Data
  $compileProvider.debugInfoEnabled(!isProd)

  // Disable comment and css class directives
  $compileProvider.commentDirectivesEnabled(false)
  $compileProvider.cssClassDirectivesEnabled(false)

  // HTTP requests inretceptor
  $httpProvider.interceptors.push($q => {
    'ngInject'
    return {
      request: config => {
        // Here you could change the request config
        return config
      },
      responseError: rejection => {
        return $q.reject(rejection)
      },
    }
  })
}

export default appConfig
