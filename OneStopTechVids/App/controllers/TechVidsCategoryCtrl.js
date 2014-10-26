///<reference path='../../Scripts/typings/angularLocalStorage/angularLocalStorage.d.ts' />
///<reference path='../../Scripts/typings/underscore/underscore.d.ts' />

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
            //var first = _.first(data);
            //console.log(first);
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

define(['app', 'angular', 'angular-sanitize', 'underscore'], function (app) {
    TechVidsCategoryCtrl.$inject = ['$scope', '$location', 'TechVidsDataSvc', 'AuthorizationService'];

    //angular
    //.module('owleen.controllers', ['ngSanitize', 'owleen.services'])
    app.controller('TechVidsCategoryCtrl', TechVidsCategoryCtrl);
});
//# sourceMappingURL=TechVidsCategoryCtrl.js.map
