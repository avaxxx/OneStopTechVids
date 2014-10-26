/// <reference path="../../services/TechVidsDataSvc.ts" />
var EditTechVideoController = (function () {
    function EditTechVideoController($scope, $routeParams, $window, dataSvc) {
        var self = this;

        self.$scope = $scope;
        self.$routeParams = $routeParams;
        self.dataSvc = dataSvc;

        self.$scope.editVideo = function () {
            self.$scope.video.category = self.$scope.category.id;
            dataSvc.updateVideo(self.$scope.video).then(function (parameters) {
                self.$scope.techVidForm.$setPristine();
                $window.location.href = "#/list/" + self.$scope.video.category;
            });
        };

        self.$scope.deleteVideo = function () {
            dataSvc.deleteVideo(self.$scope.video.id).then(function () {
                self.$scope.techVidForm.$setPristine();
                $window.location.href = "#/list/" + self.$scope.video.category;
            });
        };

        self.init();
    }
    EditTechVideoController.prototype.init = function () {
        var self = this;
        self.$scope.name = /^[a-zA-Z ]*$/;
        self.dataSvc.getVideo(parseInt(this.$routeParams.id)).then(function (data) {
            self.$scope.video = data;
            self.dataSvc.getCategory(self.$scope.video.category).then(function (result) {
                self.$scope.category = result;
            });
        });

        self.dataSvc.getAllCategories().then(function (data) {
            self.$scope.categories = data;
        });
    };
    return EditTechVideoController;
})();

define(['app', 'angular-sanitize'], function (app) {
    EditTechVideoController.$inject = ['$scope', '$routeParams', '$window', 'TechVidsDataSvc'];

    app.register.controller('EditTechVideoController', EditTechVideoController);
});
//# sourceMappingURL=EditTechVideoController.js.map
