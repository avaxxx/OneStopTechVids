interface INavBarControllerScope extends ng.IScope {
    authentification: Extensions.Authentication;
    logout(): void;
}

class NavBarController {
    private $scope: INavBarControllerScope;
    private AuthorizationService: AuthorizationService;
    private $location: ng.ILocationService;

    private init(): void {
        var self = this;
        
        self.$scope.authentification = self.AuthorizationService.authentification;

        self.$scope.logout = function () {
            self.AuthorizationService.logout();
            self.$location.path('/login');
        }
        }



    constructor($scope: INavBarControllerScope, $location: ng.ILocationService, AuthorizationService: AuthorizationService) {
        this.$scope = $scope;
        this.$location = $location;
        this.AuthorizationService = AuthorizationService;

        this.init();


    }
}


define(['app', 'angular', 'angular-sanitize'],
    function (app: ng.IModule) {
        NavBarController.$inject = ['$scope', '$location', 'AuthorizationService'];
        //angular
        //.module('owleen.controllers', ['ngSanitize', 'owleen.services'])
        app.controller('NavBarController', NavBarController);

    }
    );

