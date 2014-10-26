/// <reference path="../../services/TechVidsDataSvc.ts" />
class AddTechVideoController {
        $scope: Extensions.IAddTechVidScope;
        $window: ng.IWindowService;
        dataSvc: TechVidsDataSvc;

        constructor($scope: Extensions.IAddTechVidScope, $window: ng.IWindowService, dataSvc: TechVidsDataSvc) {
            var self = this;

            self.$scope = $scope;
            self.$window = $window;
            self.dataSvc = dataSvc;

            self.$scope.name = /^[a-zA-Z ]*$/;

            self.$scope.addVideo = function () {
                self.$scope.video.rating = 4;
                self.$scope.video.category = self.$scope.category.id;
                dataSvc.addVideo(self.$scope.video).then(function () {
                    var category = self.$scope.video.category;

                    self.$scope.video = { id: 0, title: "", description: "", category: 0, author: "", rating: 0 };
                    self.$scope.techVidForm.$setPristine();
                    self.$window.location.href = "#/list/" + category;
                });

            };

            self.$scope.cancelVideo = function () {
                self.$scope.video = new Extensions.Video();
                self.$scope.category = null;
                self.$scope.techVidForm.$setPristine();
            };

            self.init();
        }
        private init(): void {
            var self = this;
            self.$scope.video = new Extensions.Video();
            self.dataSvc.getAllCategories().then(function (data) {
                self.$scope.categories = data;
            });
        }
    }
    


    define(['app', 'angular-sanitize'],
        function (app:ng.IModule) {

            AddTechVideoController.$inject = ['$scope', '$window', 'TechVidsDataSvc'];

            //angular
            //    .module('owleen.controllers')
            //    .controller('AddTechVideoCtrl', AddTechVideoCtrl);
            app.register.controller('AddTechVideoController', AddTechVideoController);

        }
        );