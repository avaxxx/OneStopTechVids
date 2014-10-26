///<reference path='../Scripts/typings/angularjs/angular.d.ts' />
///<reference path='../Scripts/typings/angularjs/angular-route.d.ts' />
///<reference path='../Scripts/typings/requirejs/require.d.ts' />

define(['angular', 'angular-route', 'services/RouteResolver', 'angular-localstorage'], function (angular) {
    var app = angular.module('owleen.app', ['ngRoute', 'routeResolverServices', 'LocalStorageModule']);
    app.config([
        '$routeProvider',
        'routeResolverProvider',
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',
        '$httpProvider',
        function ($routeProvider, routeResolverProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider, localSorageServiceProvider) {
            var route = routeResolverProvider.route;

            $routeProvider.when("/list", { templateUrl: "App/Templates/VideoList.html", controller: "TechVidsListCtrl" }).when("/list/:id", { templateUrl: "App/Templates/VideoList.html", controller: "TechVidsListCtrl" }).when("/add", route.resolve('AddTechVideo', 'video/')).when("/edit/:id", route.resolve('EditTechVideo', 'video/')).when("/login", route.resolve('Login', 'account/')).when("/signup", route.resolve('Signup', 'account/')).otherwise({ redirectTo: '/list' });

            app.register = {
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

    app.run([
        '$rootScope', '$location', 'AuthorizationService', function ($rootScope, $location, AuthorizationService) {
            AuthorizationService.fillAuthData();

            //Client-side security. Server-side framework MUST add it's
            //own security as well since client-based security is easily hacked
            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                console.log(next);
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
//# sourceMappingURL=app.js.map
