'use strict';

/* App Module */

var tabooApp = angular.module('tabooApp', [
  'ngRoute',
  'tabooControllers'
]);

tabooApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/menu', {
        templateUrl: 'partials/menu.html',
        controller: 'menuCtrl'
      }).
      when('/gameParams', {
        templateUrl: 'partials/gameParams.html',
        controller: 'gameParamsCtrl'
      }).
      when('/game', {
        templateUrl: 'partials/game.html',
        controller: 'gameCtrl'
      }).
      when('/endGame', {
        templateUrl: 'partials/endGame.html',
        controller: 'endGameCtrl'
      }).
      otherwise({
        redirectTo: '/menu'
      });
  }]);