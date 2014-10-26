var LoginController = (function () {
    function LoginController($scope, $location, AuthorizationService) {
        $scope.message = "";

        $scope.login = function () {
            AuthorizationService.login($scope.loginData).then(function (response) {
                $location.path('/list');
            }, function (err) {
                $scope.message = err.error_description;
            });
        };
    }
    return LoginController;
})();

define(['app', 'angular-sanitize'], function (app) {
    LoginController.$inject = ['$scope', '$location', 'AuthorizationService'];

    //angular
    //    .module('owleen.controllers')
    //    .controller('AddTechVideoCtrl', AddTechVideoCtrl);
    app.register.controller('LoginController', LoginController);
});
//# sourceMappingURL=LoginController.js.map
