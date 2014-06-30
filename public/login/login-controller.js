'use strict';

var agoraAppLoginController =
  angular.module('agoraAppLoginController', []);
  
agoraAppLoginController.controller('LoginCtrl', ['$scope', 'Login', '$location',
  function ($scope, Login, $location) {
    $scope.login = function(form) {
      Login.login({username: $scope.username, password: $scope.password},
        function(err) {
          $scope.error = {};
          $scope.errors = {};
          
          if (!err) {
            $location.path('/');
          } else {
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.type;
            });
            $scope.error.other = err.message;
          }
        });
    };
  }]);
