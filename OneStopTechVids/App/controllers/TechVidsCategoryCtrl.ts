///<reference path='../../Scripts/typings/angularLocalStorage/angularLocalStorage.d.ts' />
///<reference path='../../Scripts/typings/underscore/underscore.d.ts' />

interface ITechVidsCategoryScope extends ng.IScope {
    categories: Array<Extensions.Category>;
    authentification: Extensions.Authentication;
    logout(): void;
}

class TechVidsCategoryCtrl {
        private $scope: ITechVidsCategoryScope;
        private dataSvc: TechVidsDataSvc;
        private AuthorizationService: AuthorizationService;
        private $location: ng.ILocationService;

        private init(): void {
            var self = this;

            self.dataSvc.getAllCategories().then(function (data) {
                //var first = _.first(data);
                //console.log(first);
                    self.$scope.categories = data;
                }); 
            
            self.$scope.authentification = self.AuthorizationService.authentification;

            self.$scope.logout = function () {
                self.AuthorizationService.logout();
                self.$location.path('/login');
            }
        }

       

    constructor($scope: ITechVidsCategoryScope, $location: ng.ILocationService, techVidsDataSvc: TechVidsDataSvc, AuthorizationService: AuthorizationService) {
            this.$scope = $scope;
            this.dataSvc = techVidsDataSvc;
            this.AuthorizationService = AuthorizationService;
            this.$location = $location;
            this.init();
            
       
        }

        //constructor($scope: Extensions.ITechVidsCategoryScope) {
        //    this.$scope = $scope;

        //    this.init();
        //}
    }
    

    define(['app','angular', 'angular-sanitize', 'underscore'],
        function (app:ng.IModule) {
            TechVidsCategoryCtrl.$inject = ['$scope','$location', 'TechVidsDataSvc', 'AuthorizationService'];
            //angular
                //.module('owleen.controllers', ['ngSanitize', 'owleen.services'])
                app.controller('TechVidsCategoryCtrl', TechVidsCategoryCtrl);
            
        }
    );

