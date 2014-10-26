var NavBarController = (function () {
    function NavBarController($scope, $location, AuthorizationService) {
        this.$scope = $scope;
        this.$location = $location;
        this.AuthorizationService = AuthorizationService;

        this.init();
    }
    NavBarController.prototype.init = function () {
        var self = this;

        self.$scope.authentification = self.AuthorizationService.authentification;

        self.$scope.logout = function () {
            self.AuthorizationService.logout();
            self.$location.path('/login');
        };
    };
    return NavBarController;
})();

define(['app', 'angular', 'angular-sanitize'], function (app) {
    NavBarController.$inject = ['$scope', '$location', 'AuthorizationService'];

    //angular
    //.module('owleen.controllers', ['ngSanitize', 'owleen.services'])
    app.controller('NavBarController', NavBarController);
});
//# sourceMappingURL=NavBarController.js.map
