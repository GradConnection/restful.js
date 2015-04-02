"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

module.exports = restful;

var assign = _interopRequire(require("object-assign"));

var configurable = _interopRequire(require("./util/configurable"));

var collection = _interopRequire(require("./model/collection"));

var member = _interopRequire(require("./model/member"));

var resource = _interopRequire(require("./model/resource"));

var axios = _interopRequire(require("axios"));

var http = _interopRequire(require("./service/http"));

function restful(baseUrl, port) {
    var config = {
        baseUrl: baseUrl,
        port: port || 80,
        prefixUrl: "",
        protocol: "http" };

    var fakeEndpoint = (function () {
        var _config = {
            _http: http(axios),
            headers: {},
            requestInterceptors: [],
            responseInterceptors: [] };

        var model = {
            url: (function (_url) {
                var _urlWrapper = function url() {
                    return _url.apply(this, arguments);
                };

                _urlWrapper.toString = function () {
                    return _url.toString();
                };

                return _urlWrapper;
            })(function () {
                var url = config.protocol + "://" + config.baseUrl;

                if (config.port !== 80) {
                    url += ":" + config.port;
                }

                if (config.prefixUrl !== "") {
                    url += "/" + config.prefixUrl;
                }

                return url;
            })
        };

        configurable(model, _config);

        return assign(function () {
            return _config._http;
        }, model);
    })();

    var model = {
        url: function url() {
            return fakeEndpoint.url();
        },

        one: function one(name, id) {
            return member(name, id, model);
        },

        all: function all(name) {
            return collection(name, model);
        }
    };

    // We override model because one and all need it as a closure
    model = assign(resource(fakeEndpoint), model);

    configurable(model, config);

    return model;
}