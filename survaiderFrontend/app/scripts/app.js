'use strict';

/**
 * @ngdoc overview
 * @name survaiderFrontendApp
 * @description
 * # survaiderFrontendApp
 *
 * Main module of the application.
 */
angular
  .module('survaiderFrontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'nvd3'
  ])
  .config(function ($stateProvider,$urlRouterProvider) {
	
   $urlRouterProvider.otherwise('/');	
    $stateProvider
      .state('app',{
         abtract:true
      })
      .state('app.home', {
        url : '/',
        views:{
        		'@':{
        			templateUrl: 'views/main.html',
        			controller: 'MainCtrl',
        			controllerAs: 'vm'
      	   }
        }
    })
    .state('app.unit',{
      url: '/units',
      views:{
        '@':{
          templateUrl: 'views/units.html',
          controller: 'UnitCtrl',
          controllerAs: 'vm'
        }
      },
      params:{
        id: null,
        name:null
      }
    });
});
