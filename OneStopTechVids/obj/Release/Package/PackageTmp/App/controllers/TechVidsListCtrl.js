var TechVidsListCtrl = (function () {
    function TechVidsListCtrl($scope, $routeParams, dataSvc) {
        var self = this;

        self.$scope = $scope;
        self.$routeParams = $routeParams;
        self.dataSvc = dataSvc;

        self.$scope.upRate = function (id, rating) {
            self.dataSvc.setRating(id, rating + 1).then(function () {
                self.init();
            });
        };

        self.$scope.downRate = function (id, rating) {
            self.dataSvc.setRating(id, rating - 1).then(function () {
                self.init();
            });
        };

        self.init();
    }
    TechVidsListCtrl.prototype.init = function () {
        var self = this;

        //Fetching all videos if id is not found in route path
        if (self.$routeParams.id !== undefined) {
            self.dataSvc.getVideosByCategory(parseInt(this.$routeParams.id)).then(function (data) {
                self.$scope.videos = data;
            });
        } else {
            self.dataSvc.getAllVideos().then(function (data) {
                self.$scope.videos = data;
            });
        }
    };
    return TechVidsListCtrl;
})();

define(['app', 'angular-sanitize'], function (app) {
    TechVidsListCtrl.$inject = ['$scope', '$routeParams', 'TechVidsDataSvc'];
    app.controller('TechVidsListCtrl', TechVidsListCtrl);
});
//# sourceMappingURL=TechVidsListCtrl.js.map
