///<reference path='../../Scripts/typings/angularjs/angular.d.ts' />
///<reference path='../../Scripts/typings/angularjs/angular-resource.d.ts' />
///<reference path='../../Scripts/typings/requirejs/require.d.ts' />

var BasicController = (function () {
    function BasicController($scope) {
        this.$scope = $scope;

        this.$scope.appTitle = "Skuska skuska";

        this.$scope.clickFunction = function () {
            console.log("hello");
        };
    }
    return BasicController;
})();

define(['angular'], function (angular) {
    var injectParams = ['$scope'];

    BasicController.$inject = injectParams;

    //Loaded normally since the script is loaded upfront
    //Dynamically loaded controller use app.register.controller
    //app.controller('BasicController', BasicController);
    angular.module('owleen.controllers', ['ngSanitize']).controller('BasicController', BasicController);
});
//# sourceMappingURL=BasicController.js.map
