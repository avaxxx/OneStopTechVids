///<reference path='../../Scripts/typings/angularLocalStorage/angularLocalStorage.d.ts' />

var TechVidsCategoryCtrl = (function () {
    function TechVidsCategoryCtrl($scope, $location, techVidsDataSvc, AuthorizationService) {
        this.$scope = $scope;
        this.dataSvc = techVidsDataSvc;
        this.AuthorizationService = AuthorizationService;
        this.$location = $location;
        this.init();
    }
    TechVidsCategoryCtrl.prototype.init = function () {
        var self = this;

        self.dataSvc.getAllCategories().then(function (data) {
            self.$scope.categories = data;
        });

        self.$scope.authentification = self.AuthorizationService.authentification;

        self.$scope.logout = function () {
            self.AuthorizationService.logout();
            self.$location.path('/login');
        };
    };
    return TechVidsCategoryCtrl;
})();

define(['app', 'angular', 'angular-sanitize'], function (app) {
    TechVidsCategoryCtrl.$inject = ['$scope', '$location', 'TechVidsDataSvc', 'AuthorizationService'];

    //angular
    //.module('owleen.controllers', ['ngSanitize', 'owleen.services'])
    app.controller('TechVidsCategoryCtrl', TechVidsCategoryCtrl);
});
//# sourceMappingURL=TechVidsCategoryCtrl.js.map
