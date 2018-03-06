var template = require('./app-loader.html');
require('./app-loader.scss');

var appLoader = {
  bindings: {},
  templateUrl: template,
  controller: function($scope, $http, $element, $timeout) {
    'ngInject';

    var ctrl = this;

    ctrl.isLoading = false;
    ctrl.isActive = false;

    var _count = 0;
    var intervalCounterId = 0;
    var _hasPendingRequests = function() {
      return $http.pendingRequests.length > 0;
    };

    $scope.$watch(_hasPendingRequests, function(newVal, oldVal) {
      if (newVal !== oldVal) {
        ctrl.isLoading = newVal;
      }

      if (ctrl.isLoading) {
        startProgress();
      } else {
        completeProgress();
      }
    });

    function startProgress() {
      ctrl.isActive = true;
      intervalCounterId = setInterval(frame, 10);
      function frame() {
        if (_count >= 100) {
          clearInterval(intervalCounterId);
        } else {
          _count++;
          $element[0].firstChild.firstElementChild.style.width = _count + '%';
        }
      }
    }

    function completeProgress() {
      _count = 100;
      clearInterval(intervalCounterId);
      $timeout(function() {
        $element[0].firstChild.firstElementChild.style.width = _count + '%';
        _count = 0;
        ctrl.isActive = false;
      }, 100);
    }
  },
};

module.exports = appLoader;
