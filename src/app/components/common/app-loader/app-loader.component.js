import template from './app-loader.html'
import './app-loader.scss'

const appLoader = {
  bindings: {},
  templateUrl: template,
  controller: function($scope, $http, $element, $timeout) {
    'ngInject'

    const ctrl = this

    ctrl.isLoading = false
    ctrl.isActive = false

    let _count = 0
    let intervalCounterId = 0
    const _hasPendingRequests = function() {
      return $http.pendingRequests.length > 0
    }

    $scope.$watch(_hasPendingRequests, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        ctrl.isLoading = newVal
      }

      if (ctrl.isLoading) {
        startProgress()
      } else {
        completeProgress()
      }
    })

    function startProgress() {
      ctrl.isActive = true
      intervalCounterId = setInterval(frame, 10)
      function frame() {
        if (_count >= 100) {
          clearInterval(intervalCounterId)
        } else {
          _count++
          $element[0].firstChild.firstElementChild.style.width = _count + '%'
        }
      }
    }

    function completeProgress() {
      _count = 100
      clearInterval(intervalCounterId)
      $timeout(() => {
        $element[0].firstChild.firstElementChild.style.width = _count + '%'
        _count = 0
        ctrl.isActive = false
      }, 100)
    }
  },
}

export default appLoader
