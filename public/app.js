'use strict';

angular
  .module('app', ['ngCookies','ngRoute','ngSanitize','ngStorage','ngLodash'])
    //config route of app
  .config(function ($routeProvider, $locationProvider) {
    //enable html5 mode
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/main', {
        templateUrl: 'main/main.html',
        controller: 'MainCtrl'
      })
      .when('/join', {
        templateUrl: 'join/join.html',
        controller: 'JoinCtrl'
      })

      .otherwise({
        redirectTo: '/join'
      });
  });
