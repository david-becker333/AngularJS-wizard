(function () {
    'use strict';

    angular
        .module('migrationUtils')
        .service('RestProxyService', ['$http', '_', '$window', RestProxyService]);



    var getTaskList = "/appliance/migrationservice/api/v1/migrationlist";
        var httpGetTaskListUrl = "https://" + window.location.host + "/appliance/appproxy.action?forward=" + getTaskList + "&" + window.CSRF_TOKEN_NAME + "=" + window.CSRF_TOKEN_VALUE;

        $http({
            url: httpGetTaskListUrl,
            method: 'GET',
        }).then(function successCallback(response) {
            var infoObj = angular.fromJson(response.data);
            for (var i = 0; i < infoObj.taskStatusList.length; i++) {
                var aTask = infoObj.taskStatusList[i];
                $scope.tasksStatus.push({
                    expanded: false,
                    migrationTaskId: aTask.taskId,
                    migrationProgress: $scope.formatprogressDays(aTask.progressDays),
                    migrationWindow: $scope.formatDurationTime(aTask.actualDuration),
                    imagesMigrated: aTask.imagesCopiedNum,
                    dataMoved: aTask.dataMoved,
                    transferRate: aTask.transferRate,
                    policiesConverted: aTask.policyConvertNum,
                    status: aTask.status,
                    taskDetail: aTask.taskDetail,
                    jobsStatus: []
                });
            };

            if ($scope.tasksStatus && $scope.tasksStatus.length === 0) {
                $scope.$state.go('app.start');
            } else {
                $scope.hasQueuedJobs = $scope.hasQueuedActiveJobs();
            }

        }, function errorCallback(response) {
            console.log("http request for Get task list failed");
        });
    

    /** @ngInject */
    function RestProxyService($http, _, $window) {

        var baseApiUrl = function() {
            var builder = [];
            builder.push('https' + '://');
            builder.push(window.location.host);
            builder.push("/appliance/appproxy.action");
            
            return builder.join("");
        }
        var baseUrl = baseApiUrl();
        

        var toApiUri = function () {
            // this will add additional path info but just default to baseUrl for now
            return baseUrl;
        };

        var parseParams = function (uri, params) {

            var parsed = uri.toString();
            var paramsDelimiter = "?";
            var paramDelimiter = "=";

            if(!params) {
                params = {};
            }
            // let's push the default required uri/forward param
            params['forward'] = uri;
            // add the XSRF/CSRF
            params[$window.CSRF_TOKEN_NAME] = $window.CSRF_TOKEN_VALUE;


            _.forEach(params, function (n, key) {
                var paramKey = ":" + key;
                if (parsed.indexOf(paramKey) > -1) {
                    parsed = parsed.replace(paramKey, n);
                } else {
                    if (parsed.indexOf(paramsDelimiter) == -1) {
                        parsed = parsed + paramsDelimiter;
                    }
                    parsed = parsed + key + paramDelimiter + n + "&";
                }
            });

            if (parsed.charAt(parsed.length - 1) == "&") {
                parsed = parsed.substr(0, parsed.length - 1);
            }

            return parsed;
        };


        var dataFactory = {};
        dataFactory.get = function (uri, params) {
            var parsedUri = toApiUri();
            parsedUri = parseParams(parsedUri, params);
            return $http.get(parsedUri, {});
        };

        dataFactory.query = function (uri, params) {
            var parsedUri = toApiUri();
            parsedUri = parseParams(parsedUri, params);
            return $http.get(parsedUri, {});
        };


        dataFactory.put = function (uri, params, data) {
            var parsedUri = toApiUri();
            parsedUri = parseParams(parsedUri, params);
            return $http.put(parsedUri, data, {});
        };

        dataFactory.post = function (uri, params, data) {
            var parsedUri = toApiUri();
            parsedUri = parseParams(parsedUri, params);
            return $http.post(parsedUri, data, {});
        };



        return dataFactory;
    }
})();

