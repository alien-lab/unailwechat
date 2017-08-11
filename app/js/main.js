
/*(function () {
    'use strict';

// Declare app level module which depends on views, and components
    angular.module('alienlab', [
        "ui.router", 'toaster', "ngAnimate", "ngCookies", "ngStorage", "ngResource","ui.bootstrap", "ui.bootstrap.datetimepicker"
    ]).config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', '$urlMatcherFactoryProvider',
        function ($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, $urlMatcherFactoryProvider) {//路由定义
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('stuindex', {
                    url: '/stuindex',
                    templateUrl: 'views/stuindex.html',
                    controller: "stuindexController"
                })
                .state('stuevaluate', {
                    url: '/stuevaluate/:scheId',
                    templateUrl: 'views/stuevaluate.html',
                    controller: "stuevaluateController"
                })

            ;
        }])
    ;
})();
(function () {
    'use strict';
    angular.module('alienlab').run(['$rootScope', '$log', "wechatService", "$location", "runmodal", "AuthServerProvider",
        function ($rootScope, $log, wechatService, $location, runmodal, AuthServerProvider) {
            $rootScope.isloading = true;
            AuthServerProvider.login({
                username: "admin",
                password: "user",
                rememberMe: true
            }, function () {
                //启动
                wechatService.wechatConfig();
                if (runmodal == "dev") {//调试模式模拟身份
                    wechatService.testUser();
                } else {
                    console.log(window.location.search);
                    var search = window.location.search;
                    search=search.substring(1);
                    var params=search.split("&");
                    var paramObject={};
                    for(var i=0;params&&i<params.length;i++){
                        var s=params[i];
                        var p=s.split("=");
                        if(p&&p[0]){
                            paramObject[p[0]]=p[1];
                        }
                    }
                    console.log("url paramObject",paramObject);
                    if (search.indexOf("code=")>=0) {
                        console.log("system start! find code param.invoke code user method");
                        if(paramObject["code"]){
                            console.log("code value is "+paramObject["code"]);
                            wechatService.loadWechatUser(paramObject["code"]);
                        }
                    } else {
                        //alert("没有从微信跳转");
                        var shareid = paramObject["shareid"];
                        if(shareid==null){
                            shareid=$location.search().shareid;
                        }
                        var wechatuser=wechatService.getWechatUserCookies();
                        if(wechatuser==null){
                            var link = wechatService.getAuthUrl($location.$$absUrl, shareid);
                            window.location.href = link;
                        }
                    }
                }
            });

        }]);

})();
(function () {
    'use strict';
    // DO NOT EDIT THIS FILE, EDIT THE GULP TASK NGCONSTANT SETTINGS INSTEAD WHICH GENERATES THIS FILE
    angular
        .module('alienlab')
        .constant('smsurl', "http://test.moistmedia.net/catpowerserver/api/sendsms")
        // .constant('tokenUrl', "http://localhost:8082/api/authenticate/client")
        // .constant('domain',"http://localhost:8082/")
        // .constant('rootpath',"http://localhost:8082/activitywechat/")
        .constant('tokenUrl', "http://test.moistmedia.net/catpowerserver/api/authenticate")
        .constant('domain', "http://test.moistmedia.net/catpowerserver/")
        .constant('rootpath', "http://test.moistmedia.net/catpowerwechat/")
        // .constant('tokenUrl', "http://test.moistmedia.net/ziranliserver/api/authenticate")
        // .constant('domain',"http://test.moistmedia.net/ziranliserver/")
        // .constant('rootpath',"http://test.moistmedia.net/ziranliwechat/")
        .constant('homePage', "stuindex")
        .constant('wechatappid', "wxd5ceca5e98cb548d")
        .constant('runmodal', "prod")
    ;
})();*/


(function () {
    'use strict';

// Declare app level module which depends on views, and components
    angular.module('alienlab', [
        "ui.router", 'toaster', "ngAnimate", "ngCookies", "ngStorage", "ngResource"
    ]).config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', '$urlMatcherFactoryProvider',
        function ($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, $urlMatcherFactoryProvider) {//路由定义
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('userindex', {
                    url: '/userindex',
                    templateUrl: 'views/userindex.html',
                    controller: "userindexController"
                })

            ;
        }])
    ;
})();
(function () {
    'use strict';
    angular.module('alienlab').run(['$rootScope', '$log', "wechatService", "$location", "runmodal", "AuthServerProvider",
        function ($rootScope, $log, wechatService, $location, runmodal, AuthServerProvider) {
            $rootScope.isloading = true;
            AuthServerProvider.login({
                username: "admin",
                password: "user",
                rememberMe: true
            }, function () {
                if (runmodal == "dev") {//调试模式模拟身份
                    wechatService.testUser();
                } else {
                    //启动
                    wechatService.wechatConfig();
                    var url = $location.$$absUrl;
                    var pos = url.indexOf("code=");
                    if (pos > 0) {
                        url = url.substring(pos + 5);
                        console.log(url);
                        var nextPos = url.indexOf("&");
                        var code = url.substring(0, nextPos);
                        console.log(code);
                        console.log("system start! find code param.invoke code user method");
                        wechatService.loadWechatUser(code);
                    } else {
                        //alert("没有从微信跳转");
                        var shareid = $location.search().shareid;
                        console.log()
                        var link = wechatService.getAuthUrl($location.$$absUrl, shareid);
                        window.location.href = link;
                    }
                }
            });

        }]);

})();
(function () {
    'use strict';
    // DO NOT EDIT THIS FILE, EDIT THE GULP TASK NGCONSTANT SETTINGS INSTEAD WHICH GENERATES THIS FILE
    angular
        .module('alienlab')
        .constant('smsurl', "http://test.moistmedia.net/catpowerserver/api/sendsms")
        // .constant('tokenUrl', "http://localhost:8082/api/authenticate/client")
        // .constant('domain',"http://localhost:8082/")
        // .constant('rootpath',"http://localhost:8082/activitywechat/")
        .constant('tokenUrl', "http://test.moistmedia.net/catpowerserver/api/authenticate")
        .constant('domain', "http://test.moistmedia.net/catpowerserver/")
        .constant('rootpath', "http://localhost:8080/catpowerwechat/")
        // .constant('tokenUrl', "http://test.moistmedia.net/ziranliserver/api/authenticate")
        // .constant('domain',"http://test.moistmedia.net/ziranliserver/")
        // .constant('rootpath',"http://test.moistmedia.net/ziranliwechat/")
        .constant('homePage', "stuindex")
        .constant('wechatappid', "")
        .constant('runmodal', "dev")
    ;
})();


