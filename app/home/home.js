(function(angular) {
  "use strict";

  var app = angular.module('myApp.home', ['firebase.auth', 'firebase', 'firebase.utils', 'ngRoute']);

  app.controller('HomeCtrl', ['$scope', 'fbutil', 'user', '$firebaseObject', 'FBURL', '$http', function ($scope, fbutil, user, $firebaseObject, FBURL, $http) {
    $scope.syncedValue = $firebaseObject(fbutil.ref('syncedValue'));
    $scope.user = user;
      console.log($scope.user); 
    $scope.FBURL = FBURL;
      
        // Simple GET request example :
      $http.get('https://api.github.com/repos/rohillion/kitchsy/git/commits/e8946ebbdde382c7de4889e43a2e49bd2a264504?access_token='+$scope.user.github.accessToken).then(function (response) {
        console.log('success');
        console.log(response);
      }, function (response) {
        console.log('error');
        console.log(response);
      });
      
  }]);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'home/home.html',
      controller: 'HomeCtrl',
      resolve: {
        // forces the page to wait for this promise to resolve before controller is loaded
        // the controller can then inject `user` as a dependency. This could also be done
        // in the controller, but this makes things cleaner (controller doesn't need to worry
        // about auth status or timing of accessing data or displaying elements)
        user: ['Auth', function (Auth) {
          return Auth.$waitForAuth();
        }]
      }
    });
  }]);

})(angular);

