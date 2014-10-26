///<reference path='../../Scripts/typings/angularjs/angular.d.ts' />
///<reference path='../../Scripts/typings/angularjs/angular-resource.d.ts' />
///<reference path='../../Scripts/typings/requirejs/require.d.ts' />
///<reference path='../../Scripts/typings/kendo/kendo.all.d.ts' />


interface IBasicControllerScope extends ng.IScope {
    appTitle: string;
    clickFunction(): void;
    clickFunction2(e:kendo.ui.DropDownList): void;
    getType(x:any): any;
    isDate(x: any): any;
    options: kendo.ui.DatePickerOptions;

    category: string;
    categories: kendo.data.DataSource;
    dropDownOptions: kendo.ui.DropDownListOptions;
    dropDownValue: any;

}

class BasicController {
    $scope: IBasicControllerScope;
    constructor($scope: IBasicControllerScope) {
        this.$scope = $scope;

        this.$scope.appTitle = "Skuska skuska";

        this.$scope.clickFunction = () => {
            console.log('hello');
        }

        this.$scope.clickFunction2 = (e) => {
            var self = this;
        }

        this.$scope.getType = x => typeof x;
        this.$scope.isDate = x => x instanceof Date;

        this.$scope.options = { start: 'day', format: 'dd.MM yyyy' }

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
}

define(['app'], function (app: ng.IModule) {

    var injectParams = ['$scope'];
    BasicController.$inject = injectParams;
    app.controller('BasicController', BasicController);
});