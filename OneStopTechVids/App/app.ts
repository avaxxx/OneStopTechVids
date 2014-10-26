///<reference path='../Scripts/typings/angularjs/angular.d.ts' />
///<reference path='../Scripts/typings/angularjs/angular-route.d.ts' />
///<reference path='../Scripts/typings/requirejs/require.d.ts' />

interface IHomepageRootScope extends ng.IScope {
    pageTitle: string;
}

define(
    ['angular', 'angular-route', 'services/RouteResolver', 'angular-localstorage'],
    function (angular: ng.IAngularStatic) {

        angular.module('underscore', []).factory('_', function () {
            var wind: any = window;
            return wind._; // assumes underscore has already been loaded on the page
        });

        var app = angular.module('owleen.app', ['ngRoute', 'routeResolverServices', 'LocalStorageModule', 'underscore','kendo.directives']);
        app.config([
            '$routeProvider',
            'routeResolverProvider',
            '$controllerProvider',
            '$compileProvider',
            '$filterProvider',
            '$provide',
            '$httpProvider',
            function($routeProvider: ng.route.IRouteProvider,
                routeResolverProvider: any,
                $controllerProvider: ng.IControllerProvider,
                $compileProvider: ng.ICompileProvider,
                $filterProvider: ng.IFilterProvider,
                $provide: ng.auto.IProvideService,
                $httpProvider: ng.IHttpProvider,
                localSorageServiceProvider) {

                var route = routeResolverProvider.route;

                $routeProvider
                    .when("/list", { templateUrl: "App/Templates/VideoList.html", controller: "TechVidsListCtrl" })
                    .when("/kendo", {templateUrl: "App/Templates/Basic.html", controller: "BasicController"})
                    .when("/list/:id", { templateUrl: "App/Templates/VideoList.html", controller: "TechVidsListCtrl" })
                    //.when("/add", { templateUrl: "App/Templates/AddVideo.html", controller: "AddTechVideoCtrl" })
                    .when("/add", route.resolve('AddTechVideo', 'video/'))
                    .when("/edit/:id", route.resolve('EditTechVideo', 'video/'))
                    .when("/login", route.resolve('Login', 'account/'))
                    .when("/signup", route.resolve('Signup', 'account/'))
                    //.when("/edit/:id", { templateUrl: "App/Templates/EditVideo.html", controller: "EditTechVideoCtrl" })
                    .otherwise({ redirectTo: '/list' });

                app.register =
                {
                    controller: $controllerProvider.register,
                    directive: $compileProvider.directive,
                    filter: $filterProvider.register,
                    factory: $provide.factory,
                    service: $provide.service
                };


            }
        ]);

        var authorizationUrl = 'api/Authorization/';
        app.constant('ngAuthSettings', {
            authorizationUrl: authorizationUrl,
            clientId: 'owleenApp'
        });

        app.run(['$rootScope', '$location', 'AuthorizationService', function ($rootScope, $location, AuthorizationService : AuthorizationService) {

            AuthorizationService.fillAuthData();
            //Client-side security. Server-side framework MUST add it's 
            //own security as well since client-based security is easily hacked
            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                if (next && next.$$route && next.$$route.originalPath != '/signup') {
                    if (!AuthorizationService.authentification.isAuth) {
                        $rootScope.$evalAsync(function () {
                            $location.path('/login');
                        });
                    }
                }
            });
            }]);
        return app;
    });