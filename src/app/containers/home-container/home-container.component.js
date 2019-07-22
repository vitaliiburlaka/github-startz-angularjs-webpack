import templateUrl from './home-container.html'

const homeContainer = {
  bindings: {
    popularReposData: '<',
  },
  templateUrl,
  controller: function(GitHubApiService) {
    'ngInject'

    const ctrl = this
    ctrl.languages = [
      'All',
      'JavaScript',
      'TypeScript',
      'Java',
      'Python',
      'Swift',
    ]
    ctrl.selectedLanguage = 'All'
    ctrl.repos = null

    ctrl.$onInit = () => {
      ctrl.repos = ctrl.popularReposData
    }

    ctrl.onSelect = lang => {
      ctrl.selectedLanguage = lang
      updateLanguage(lang)
    }

    function updateLanguage(lang) {
      GitHubApiService.fetchPopularRepos(lang).then(data => {
        ctrl.repos = data
      })
    }
  },
}

export default homeContainer
