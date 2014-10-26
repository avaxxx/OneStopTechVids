///<reference path='../../Scripts/typings/angularLocalStorage/angularLocalStorage.d.ts' />

interface IAuthorizationService {
    fillAuthData(): void;
    login(loginData: Extensions.LoginData): ng.IPromise<any>;
    logout(): void;
    authentification: Extensions.Authentication;
    saveRegistration(registrationData:Extensions.RegisterData): void;
}

class AuthorizationService implements IAuthorizationService {
    private authorizationApiPath: string;
    private serviceBase: string;
    private httpService: ng.IHttpService;
    private qService: ng.IQService;
    private ngAuthSettings: any;
    private localStorageService: ng.localStorage.ILocalStorageService;
    public authentification: Extensions.Authentication;
    
    constructor($http: ng.IHttpService, $q: ng.IQService, ngAuthSettings: any,  localStorageService: ng.localStorage.ILocalStorageService) {
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

    fillAuthData(): void {
        var self = this;
        var auth: Extensions.Authentication = self.localStorageService.get('authorizationData');
        if (auth) {


            self.authentification.isAuth = auth.isAuth;
            self.authentification.userName = auth.userName;
        }
    }

    login(loginData): ng.IPromise<any> {
        var self = this;
        var user = new Extensions.User();
        user.userName = loginData.userName;
        user.password = loginData.password;

        var deferred = this.qService.defer();

        this.httpService.post(this.serviceBase + 'login', user).success((response: string) => {
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
    }

    saveRegistration(registrationData): ng.IPromise<any> {
        var self = this;
        self.logout();


        return this.httpService.post('api/Registration/register', registrationData).then(function (response) {
            return response;
        });
    }

    logout(): void {
        var self = this;
        self.localStorageService.remove('authorizationData');
        self.authentification.isAuth = false;
        self.authentification.userName = "";
        self.authentification.useRefreshTokens = false;
    }


    static inject = ['$http', '$q','ngAuthSettings', 'localStorageService'];

    public static AuthorizationServiceFactory($http: ng.IHttpService, $q: ng.IQService, ngAuthSettings:any, localStorageService: ng.localStorage.ILocalStorageService): AuthorizationService {
        return new AuthorizationService($http, $q, ngAuthSettings, localStorageService);
    }
}

define(['app', 'angular'],
    function (app: ng.IModule) {
        app.factory('AuthorizationService', ['$http', '$q', 'ngAuthSettings', 'localStorageService', ($http, $q, ngAuthSettings, localStorageService) => new AuthorizationService($http, $q, ngAuthSettings, localStorageService)]);
    });