   class TechVidsListCtrl {
        private $scope: Extensions.ITechVidsScope;
        private $routeParams: Extensions.ITechVidsRouteParams;
        private dataSvc: TechVidsDataSvc;

        private init(): void {
            var self = this;

            //Fetching all videos if id is not found in route path
            if (self.$routeParams.id !== undefined) {
                self.dataSvc.getVideosByCategory(parseInt(this.$routeParams.id))
                    .then(function (data) {
                        self.$scope.videos = data;
                    });
            }
            //Fetching videos specific to category if id is found in route path
            else {
                self.dataSvc.getAllVideos().then(function (data) {
                    self.$scope.videos = data;
                });
            }
        }

        constructor($scope: Extensions.ITechVidsScope, $routeParams: Extensions.ITechVidsRouteParams, dataSvc: TechVidsDataSvc) {
            var self = this;

            self.$scope = $scope;
            self.$routeParams = $routeParams;
            self.dataSvc = dataSvc;

            self.$scope.upRate = function (id: number, rating: number) {
                self.dataSvc.setRating(id, rating + 1).then(function () {
                    self.init();
                });
            };

            self.$scope.downRate = function (id: number, rating: number) {
                self.dataSvc.setRating(id, rating - 1).then(function () {
                    self.init();
                });
            };

            self.init();
        }
    }


    define(['app', 'angular-sanitize'],
        function (app: ng.IModule) {

            TechVidsListCtrl.$inject = ['$scope', '$routeParams', 'TechVidsDataSvc'];
            app.controller('TechVidsListCtrl', TechVidsListCtrl);

        }
        );