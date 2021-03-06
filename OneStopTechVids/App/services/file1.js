///<reference path='../../Scripts/typings/angularjs/angular.d.ts' />
///<reference path='../../Scripts/typings/angularjs/angular-resource.d.ts' />
///<reference path='../../Scripts/typings/requirejs/require.d.ts' />

define(['angular', 'angular-resource'], function (angular) {
    var WordPressPosts = [
        '$resource',
        function ($resource) {
            return $resource('https://public-api.wordpress.com/rest/v1/sites/:site/posts', { callback: 'JSON_CALLBACK', number: 5, order_by: 'date' }, { get: { method: 'JSONP', params: { site: 'site' } } });
        }
    ];

    angular.module('owleen.services', ['ngResource']).factory('WordPressPosts', WordPressPosts);
});
//# sourceMappingURL=file1.js.map
