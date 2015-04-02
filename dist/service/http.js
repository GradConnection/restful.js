"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

module.exports = http;

var assign = _interopRequire(require("object-assign"));

function interceptorCallback(interceptors, method, url, isResponseInterceptor) {
    isResponseInterceptor = isResponseInterceptor !== undefined ? !!isResponseInterceptor : false;

    return function (data, headers) {
        if (isResponseInterceptor) {
            try {
                data = JSON.parse(data);
            } catch (e) {}
        }

        for (var i in interceptors) {
            data = interceptors[i](data, headers, method, url);
        }

        if (!isResponseInterceptor) {
            try {
                data = JSON.stringify(data);
            } catch (e) {}
        }

        return data;
    };
};

function http(httpBackend) {
    var model = {
        request: function request(method, config) {
            config.method = method;

            if (["post", "put", "patch"].indexOf(method) !== -1) {
                config.transformRequest = [interceptorCallback(config.requestInterceptors || [], config.method, config.url)];
                delete config.requestInterceptors;
            }

            config.transformResponse = [interceptorCallback(config.responseInterceptors || [], config.method, config.url, true)];
            delete config.responseInterceptors;

            return httpBackend(config);
        }
    };

    return assign(function () {
        return httpBackend;
    }, model);
}