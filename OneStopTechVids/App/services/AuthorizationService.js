///<reference path='../../Scripts/typings/angularLocalStorage/angularLocalStorage.d.ts' />

var AuthorizationService = (function () {
    function AuthorizationService($http, $q, ngAuthSettings, localStorageService) {
        this.authorizationApiPath = "api/authorization";

        this.httpService = $http;
        this.qService = $q;
        this.localStorageService = localStorageService;
        this.serviceBase = ngAuthSettings.authorizationUrl;

        this.authentification = new Extensions.Authentication;
    }
    //fillAuthData(): void {
    //    var self = this;
    //    console.log('loading data from localstorage');
    //    var auth: Extensions.Authentication = self.localStorageService.get('authorizationData');
    //    console.log(auth);
    //    if (auth) {
    //        this.authentification.isAuth = auth.isAuth;
    //        this.authentification.userName = auth.userName;
    //    }
    //}
    AuthorizationService.prototype.fillAuthData = function () {
        var self = this;
        var auth = self.localStorageService.get('authorizationData');
        if (auth) {
            self.authentification.isAuth = auth.isAuth;
            self.authentification.userName = auth.userName;
        }
    };

    AuthorizationService.prototype.login = function (loginData) {
        var self = this;
        var user = new Extensions.User();
        user.userName = loginData.userName;
        user.password = loginData.password;

        var deferred = this.qService.defer();

        this.httpService.post(this.serviceBase + 'login', user).success(function (response) {
            if (response.length > 0) {
                self.authentification.authToken = response;
                self.authentification.userName = user.userName;
                self.authentification.isAuth = true;

                self.localStorageService.set('authorizationData', self.authentification);
            }

            deferred.resolve(response);
        }).error(function (err, status) {
            this.logOut();
            deferred.reject(err);
        });

        return deferred.promise;
    };

    AuthorizationService.prototype.saveRegistration = function (registrationData) {
        var self = this;
        self.logout();

        return this.httpService.post('api/Registration/register', registrationData).then(function (response) {
            return response;
        });
    };

    AuthorizationService.prototype.logout = function () {
        var self = this;
        self.localStorageService.remove('authorizationData');
        self.authentification.isAuth = false;
        self.authentification.userName = "";
        self.authentification.useRefreshTokens = false;
    };

    AuthorizationService.AuthorizationServiceFactory = function ($http, $q, ngAuthSettings, localStorageService) {
        return new AuthorizationService($http, $q, ngAuthSettings, localStorageService);
    };
    AuthorizationService.inject = ['$http', '$q', 'ngAuthSettings', 'localStorageService'];
    return AuthorizationService;
})();

define(['app', 'angular'], function (app) {
    app.factory('AuthorizationService', ['$http', '$q', 'ngAuthSettings', 'localStorageService', function ($http, $q, ngAuthSettings, localStorageService) {
            return new AuthorizationService($http, $q, ngAuthSettings, localStorageService);
        }]);
});
//# sourceMappingURL=AuthorizationService.js.map
