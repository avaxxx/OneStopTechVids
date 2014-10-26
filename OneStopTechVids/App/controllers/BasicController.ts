///<reference path='../../Scripts/typings/angularjs/angular.d.ts' />
///<reference path='../../Scripts/typings/angularjs/angular-resource.d.ts' />
///<reference path='../../Scripts/typings/requirejs/require.d.ts' />



interface IBasicControllerScope extends ng.IScope {
    appTitle: string;
    clickFunction(): void;
}

class BasicController {
    $scope: IBasicControllerScope;
    constructor($scope: IBasicControllerScope) {
        this.$scope = $scope;

        this.$scope.appTitle = "Skuska skuska";

        this.$scope.clickFunction = () => {
            console.log("hello");
        }
    }
}

define(['angular'], function (angular: ng.IAngularStatic) {

    var injectParams = ['$scope'];

  
    BasicController.$inject = injectParams;

    //Loaded normally since the script is loaded upfront 
    //Dynamically loaded controller use app.register.controller
    //app.controller('BasicController', BasicController);
    angular
        .module('owleen.controllers', ['ngSanitize'])
        .controller('BasicController', BasicController);
});