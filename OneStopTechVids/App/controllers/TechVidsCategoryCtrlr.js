var TechVidsCategoryCtrl = (function () {
    function TechVidsCategoryCtrl($scope, techVidsDataSvc) {
        this.$scope = $scope;
        this.dataSvc = techVidsDataSvc;

        this.init();
    }
    TechVidsCategoryCtrl.prototype.init = function () {
        var self = this;

        self.dataSvc.getAllCategories().then(function (data) {
            self.$scope.categories = data;
        });
    };
    return TechVidsCategoryCtrl;
})();

define(['angular', 'angular-sanitize', '../services/TechVidsDataSvc'], function (angular) {
    TechVidsCategoryCtrl.$inject = ['$scope', 'techVidsDataSvc'];
    angular.module('owleen.controllers', ['ngSanitize', 'owleen.services']).controller('TechVidsCategoryCtrl', TechVidsCategoryCtrl);
});
//# sourceMappingURL=TechVidsCategoryCtrlr.js.map
