(function () {
    'use strict';

    angular
        .module('migrationUtils')
        .service('RestService', RestService);

    /** @ngInject */
    function RestService($http, _) {

        var baseApiUrl = function() {
            return "http://localhost:9000/migration/api/v1";
        }
        var baseUrl = baseApiUrl();

        var toApiUri = function (path) {
            return baseUrl + "/" + path;
        };

        var parseParams = function (uri, params) {

            var parsed = uri.toString();
            var paramsDelimiter = "?";
            var paramDelimiter = "=";


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
            var parsedUri = toApiUri(uri);
            parsedUri = parseParams(parsedUri, params);
            return $http.get(parsedUri, {});
        };

        dataFactory.query = function (uri, params) {
            var parsedUri = toApiUri(uri);
            parsedUri = parseParams(parsedUri, params);
            return $http.get(parsedUri, {});
        };


        dataFactory.put = function (uri, params, data) {
            var parsedUri = toApiUri(uri);
            parsedUri = parseParams(parsedUri, params);
            return $http.put(parsedUri, data, {});
        };

        dataFactory.post = function (uri, params, data) {
            var parsedUri = toApiUri(uri);
            parsedUri = parseParams(parsedUri, params);
            return $http.post(parsedUri, data, {});
        };



        return dataFactory;
    }
})();

