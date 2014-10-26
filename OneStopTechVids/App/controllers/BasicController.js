///<reference path='../../Scripts/typings/angularjs/angular.d.ts' />
///<reference path='../../Scripts/typings/angularjs/angular-resource.d.ts' />
///<reference path='../../Scripts/typings/requirejs/require.d.ts' />
///<reference path='../../Scripts/typings/kendo/kendo.all.d.ts' />

var BasicController = (function () {
    function BasicController($scope) {
        var _this = this;
        this.$scope = $scope;

        this.$scope.appTitle = "Skuska skuska";

        this.$scope.clickFunction = function () {
            console.log('hello');
        };

        this.$scope.clickFunction2 = function (e) {
            var self = _this;
        };

        this.$scope.getType = function (x) {
            return typeof x;
        };
        this.$scope.isDate = function (x) {
            return x instanceof Date;
        };

        this.$scope.options = { start: 'day', format: 'dd.MM yyyy' };

        this.$scope.dropDownValue = 4;

        this.$scope.dropDownOptions = {
            dataValueField: 'id',
            dataTextField: 'name'
        };

        $scope.categories = new kendo.data.DataSource({
            transport: {
                read: 'api/Categories'
            }
        });
    }
    return BasicController;
})();

define(['app'], function (app) {
    var injectParams = ['$scope'];
    BasicController.$inject = injectParams;
    app.controller('BasicController', BasicController);
});
//# sourceMappingURL=BasicController.js.map
