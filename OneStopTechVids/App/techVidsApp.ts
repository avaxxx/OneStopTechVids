///// <reference path="../scripts/typings/angularjs/angular.d.ts" />
///// <reference path="../scripts/typings/angularjs/angular-route.d.ts" />
///// <reference path="../scripts/typings/requirejs/require.d.ts" />
///// <reference path="services/TechVidsDataSvc.ts" />
///// <reference path="controllers/AddVideoCtrl.ts" />
///// <reference path="controllers/EditTechVideoCtrl.ts" />
///// <reference path="controllers/TechVidsCategoryCtrlr.ts" />
///// <reference path="controllers/TechVidsListCtrl.ts" />



//module OneStopTechVidsApp {
//   export class Config {
//        constructor($routeProvider: ng.route.IRouteProvider) {
//            $routeProvider.when("/list", { templateUrl: "App/Templates/VideoList.html", controller: "TechVidsListCtrl" })
//                .when("/list/:id", { templateUrl: "App/Templates/VideoList.html", controller: "TechVidsListCtrl" })
//                .when("/add", { templateUrl: "App/Templates/AddVideo.html", controller: "AddTechVideoCtrl" })
//                .when("/edit/:id", { templateUrl: "App/Templates/EditVideo.html", controller: "EditTechVideoCtrl" })
//                .otherwise({ redirectTo: '/list' });
//        }
//    }
//    Config.$inject = ['$routeProvider'];
   

//    export class UniqueVideoTitle {
//        public static UniqueVideoTitleDirective(dataSvc: Services.TechVidsDataSvc): ng.IDirective {
//            return {
//                require: 'ngModel',
//                link: function (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: ng.INgModelController) {
//                    element.bind('blur', function() {
//                        var viewValue = element.val();
//                        dataSvc.checkIfVideoExists(viewValue).then(function (result) {
//                            if (result === "true") {
//                                ctrl.$setValidity("uniqueVideoTitle", true);
//                            } else {
//                                ctrl.$setValidity("uniqueVideoTitle", false);
//                            }
//                        }, function (error) {
//                            ctrl.$setValidity("uniqueVideoTitle", false);
//                            });
//                    });
//                }
//            };
//        }
//    }

//    var app = angular.module("techVidsApp", ['ngRoute']);
//    app.config(Config);
//    app.factory('techVidsDataSvc', ['$http', '$q', Services.TechVidsDataSvc.TechVidsDataSvcFactory]);
//    app.controller('TechVidsListCtrl', Controllers.TechVidsListCtrl);
//    app.controller('TechVidsCategoryCtrl', Controllers.TechVidsCategoryCtrl);
//    app.controller('EditTechVideoCtrl', Controllers.EditTechVideoCtrl);
//    app.controller('AddTechVideoCtrl', Controllers.AddVideoCtrl);
//    app.directive('uniqueVideoTitle', ['techVidsDataSvc', UniqueVideoTitle.UniqueVideoTitleDirective]);
//}