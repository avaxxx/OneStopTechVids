var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Extensions;
(function (Extensions) {
    var Video = (function () {
        function Video() {
        }
        return Video;
    })();
    Extensions.Video = Video;

    var Category = (function () {
        function Category() {
        }
        return Category;
    })();
    Extensions.Category = Category;

    var User = (function () {
        function User() {
        }
        return User;
    })();
    Extensions.User = User;

    var LoginData = (function () {
        function LoginData() {
        }
        return LoginData;
    })();
    Extensions.LoginData = LoginData;

    var RegisterData = (function (_super) {
        __extends(RegisterData, _super);
        function RegisterData() {
            _super.apply(this, arguments);
        }
        return RegisterData;
    })(LoginData);
    Extensions.RegisterData = RegisterData;

    var Authentication = (function () {
        function Authentication() {
        }
        return Authentication;
    })();
    Extensions.Authentication = Authentication;
    ;
})(Extensions || (Extensions = {}));
//# sourceMappingURL=extensions.js.map
