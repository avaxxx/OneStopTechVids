var SignupController = (function () {
    function SignupController($scope, $location, $timeout, AuthorizationService) {
        this.$scope = $scope;
        this.$location = $location;
        this.$timeout = $timeout;
        this.AuthorizationService = AuthorizationService;

        this.init();
    }
    SignupController.prototype.init = function () {
        var self = this;

        self.$scope.message = "";
        self.$scope.savedSuccessfully = false;
        self.$scope.registration = new Extensions.RegisterData();
        self.$scope.registration.userName = "";
        self.$scope.registration.password = "";
        self.$scope.registration.confirmPassword = "";

        self.$scope.signup = function () {
            self.AuthorizationService.saveRegistration(self.$scope.registration).then(function (response) {
                self.$scope.savedSuccessfully = true;
                self.$scope.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
                self.startTimer();
            }, function (response) {
                var errors = [];
                for (var key in response.data.modelState) {
                    for (var i = 0; i < response.data.modelState[key].length; i++) {
                        errors.push(response.data.modelState[key][i]);
                    }
                }
                self.$scope.message = "Failed to register user due to:" + errors.join(' ');
            });
        };
    };

    SignupController.prototype.startTimer = function () {
        var self = this;
        var timer = self.$timeout(function () {
            self.$timeout.cancel(timer);
            self.$location.path('/login');
        }, 2000);
    };
    return SignupController;
})();

define(['app', 'angular-sanitize'], function (app) {
    SignupController.$inject = ['$scope', '$location', '$timeout', 'AuthorizationService'];

    app.register.controller('SignupController', SignupController);
});
//# sourceMappingURL=SignupController.js.map
