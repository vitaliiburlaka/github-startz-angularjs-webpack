function appRoute($stateProvider) {
  'ngInject';
  $stateProvider.state('root', {
    url: '',
    abstract: true,
    views: {
      'App@': {
        template: '<app-component></app-component>',
      },
    },
  });
}

export default appRoute;
