var app = angular.module('myApp', ['ngRoute']);
app.config(function ($routeProvider) {
  $routeProvider
      .when('/', {
          templateUrl: 'views/page1.html'
      })
      .when('/link1', {
          templateUrl: 'views/page1.html'
      })
      .when('/link2', {
          templateUrl: 'views/page2.html', controller: 'myDataCtrl'
      })
      .when('/link3:message1', {
          templateUrl: 'views/page3.html', controller: 'myDataCtrl'
      })
      .when('/link3:message1:message2', {
          templateUrl: 'views/page4.html', controller: 'myDataCtrl'
      })
      .when('/link4:message1', {
          redirectTo: function (routeParams, path, search) {
              return "/link3"+ routeParams.message1;
          }
      })
      .when('/link5', {
          templateUrl: 'views/page5.html', controller: 'myDataCtrl',
          resolve: {
              app: function ($q, $timeout) {
                  var defer = $q.defer();
                  $timeout(function () {
                      defer.resolve();
                  }, 2000);
                  return defer.promise;
              }
          }
      })
      .when('/link6', {
          templateUrl: 'views/page6.html', controller: 'myDataCtrl',
          resolve: {
              loadData: appCtrl.loadData,
              prepData: appCtrl.prepData
          }
      })
      .otherwise({
          redirectTo: '/'
      }
  );
});

var appCtrl = app.controller('myDataCtrl',function($scope, $routeParams, $location) {
    $scope.myData = {
        msg1 : $routeParams.message1,
        msg2 : $routeParams.message1 + $routeParams.message2
    };
});

appCtrl.loadData = function ($q, $timeout) {
    var defer = $q.defer;
    $timeout(function () {
        defer().resolve();
    }, 2000);
    return defer.promise;
};

appCtrl.prepData = function ($q, $timeout) {
    var defer = $q.defer;
    $timeout(function () {
        defer().resolve();
    }, 2000);
    return defer.promise;
};