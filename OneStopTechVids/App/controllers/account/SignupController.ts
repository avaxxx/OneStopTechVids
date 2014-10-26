
interface ISignupController {
}

interface ISignupControllerScope {
    message: string;
    signup(): void;
    registration: Extensions.RegisterData;
    savedSuccessfully: boolean;
}

class SignupController implements ISignupController {
    private $scope: ISignupControllerScope;
    private $location: ng.ILocationService;
    private $timeout: ng.ITimeoutService;
    private AuthorizationService: AuthorizationService

    private init(): void {
        var self = this;

        self.$scope.message = "";
        self.$scope.savedSuccessfully = false;
        self.$scope.registration = new Extensions.RegisterData();
        self.$scope.registration.userName = "";
        self.$scope.registration.password = "";
        self.$scope.registration.confirmPassword = "";

        self.$scope.signup = function() {
                self.AuthorizationService.saveRegistration(self.$scope.registration).then(function (response) {

                    self.$scope.savedSuccessfully = true;
                    self.$scope.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
                    self.startTimer();
                    },
                    function (response) {
                        var errors = [];
                        for (var key in response.data.modelState) {
                            for (var i = 0; i < response.data.modelState[key].length; i++) {
                                errors.push(response.data.modelState[key][i]);
                            }
                        }
                        self.$scope.message = "Failed to register user due to:" + errors.join(' ');
                    });
            };
    }

    private startTimer(): void {
        var self = this;
     var timer = self.$timeout(function () {
        self.$timeout.cancel(timer);
        self.$location.path('/login');
    }, 2000);
}


    constructor($scope: ISignupControllerScope, $location: ng.ILocationService, $timeout:ng.ITimeoutService, AuthorizationService: AuthorizationService) {
        this.$scope = $scope;
        this.$location = $location;
        this.$timeout = $timeout;
        this.AuthorizationService = AuthorizationService;



        this.init();

    }
}

define(['app', 'angular-sanitize'],
    function (app: ng.IModule) {

        SignupController.$inject = ['$scope', '$location', '$timeout', 'AuthorizationService'];

        app.register.controller('SignupController', SignupController);
    });