///<reference path='../Scripts/typings/angularjs/angular.d.ts' />
///<reference path='../Scripts/typings/requirejs/require.d.ts' />
require.config({
    paths: {
        'jquery': 'https://code.jquery.com/jquery-2.1.1.min',
        'angular': 'https://ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular.min',
        'angular-route': 'https://ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular-route.min',
        'angular-sanitize': 'https://ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular-sanitize.min',
        'angular-resource': 'https://ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular-resource.min',
        'bootstrap': 'https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min',
        'domReady': 'https://cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady.min',
        'angular-localstorage': '../Scripts/angular-localstorage'
    },
    shim: {
        'angular': {
            exports: 'angular',
            deps: ['jquery', 'domReady!']
        },
        'angular-route': ['angular'],
        'angular-resource': ['angular'],
        'angular-sanitize': ['angular'],
        'bootstrap': ['jquery'],
        'angular-localstorage': ['angular']
    }
});

// startup the application
require([
    'angular',
    'domReady!',
    'app',
    'bootstrap',
    'services/RouteResolver',
    'services/TechVidsDataSvc',
    'services/AuthorizationService',
    'controllers/NavBarController',
    'controllers/TechVidsCategoryCtrl',
    'controllers/TechVidsListCtrl',
    'helpers/extensions'], function (angular, document) {
    // bootstrap the document, since we are loading asynchronously
    angular.bootstrap(document, ['owleen.app']);
});
//# sourceMappingURL=main.js.map
