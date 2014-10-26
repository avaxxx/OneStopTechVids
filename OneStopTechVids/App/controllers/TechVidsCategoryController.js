var Controllers;
(function (Controllers) {
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
    Controllers.TechVidsCategoryCtrl = TechVidsCategoryCtrl;
    TechVidsCategoryCtrl.$inject = ['$scope', 'techVidsDataSvc'];
})(Controllers || (Controllers = {}));
//# sourceMappingURL=TechVidsCategoryController.js.map
