
interface ILoginController {
    
}

interface ILoginControllerScope {
    message: string;
    login(): void;
    loginData: Extensions.LoginData;
}

class LoginController implements ILoginController {
    private $scope: ILoginControllerScope;
    private $location: ng.ILocationProvider;
    private AuthorizationService: AuthorizationService

    constructor($scope: ILoginControllerScope, $location: ng.ILocationService, AuthorizationService: AuthorizationService) {
        $scope.message = "";

        $scope.login = function() {
            AuthorizationService.login($scope.loginData).then(function (response) {

               $location.path('/list');

            },
                function (err) {
                    $scope.message = err.error_description;
                });
        };



    }
}

define(['app', 'angular-sanitize'],
    function (app: ng.IModule) {

        LoginController.$inject = ['$scope', '$location', 'AuthorizationService'];

        //angular
        //    .module('owleen.controllers')
        //    .controller('AddTechVideoCtrl', AddTechVideoCtrl);
        app.register.controller('LoginController', LoginController);

    }
    );