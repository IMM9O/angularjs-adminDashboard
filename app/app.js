'use strict';

angular.module('RDash', ['satellizer' , 'ui.bootstrap', 'ui.router', 'ngCookies']);

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider' , '$authProvider' ,
    function($stateProvider, $urlRouterProvider , $authProvider ) {

         // Satellizer configuration that specifies which API
         // route the JWT should be retrieved from
         $authProvider.loginUrl = '/api/authenticate';

         // Redirect to the auth state if any other states
         // are requested other than users
        $urlRouterProvider.otherwise('/auth');

        // Application routes
        $stateProvider
           .state('auth', {
                url: '/auth',
                templateUrl: 'auth/login.html',
                controller: 'AuthController as auth'
            })
            .state('dash', {
                url: '/dash',
                abstract: true,
                templateUrl: 'shared/layout/shell.html'
            })
            .state('dash.index', {
                url: '/index',
                templateUrl: 'templates/dashboard.html'
            })
            .state('dash.tables', {
                url: '/tables',
                templateUrl: 'templates/tables.html'
            });
    }
]);