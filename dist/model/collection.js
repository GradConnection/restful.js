"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

module.exports = collection;

var assign = _interopRequire(require("object-assign"));

var endpoint = _interopRequire(require("./endpoint"));

var responseBuilder = _interopRequire(require("../service/responseBuilder"));

var member = _interopRequire(require("./member"));

var resource = _interopRequire(require("./resource"));

function collection(name, parent) {
    var refEndpoint = endpoint([parent.url(), name].join("/"), parent());

    function memberFactory(id) {
        var _member = member(name, id, parent);

        // Configure the endpoint
        // We do it this way because the response must have a member which inherits from this collection config
        _member().headers(refEndpoint.headers()).responseInterceptors(refEndpoint.responseInterceptors()).requestInterceptors(refEndpoint.requestInterceptors());

        return _member;
    }

    var model = {
        get: function get(id, params, headers) {
            return refEndpoint.get(id, params, headers).then(function (serverResponse) {
                return responseBuilder(serverResponse, memberFactory);
            });
        },

        getAll: function getAll(params, headers) {
            return refEndpoint.getAll(params, headers).then(function (serverResponse) {
                return responseBuilder(serverResponse, memberFactory);
            });
        },

        post: function post(data, headers) {
            return refEndpoint.post(data, headers).then(function (serverResponse) {
                return responseBuilder(serverResponse);
            });
        },

        put: function put(id, data, headers) {
            return refEndpoint.put(id, data, headers).then(function (serverResponse) {
                return responseBuilder(serverResponse);
            });
        },

        patch: function patch(id, data, headers) {
            return refEndpoint.patch(id, data, headers).then(function (serverResponse) {
                return responseBuilder(serverResponse);
            });
        },

        head: function head(id, data, headers) {
            return refEndpoint.head(id, data, headers).then(function (serverResponse) {
                return responseBuilder(serverResponse);
            });
        },

        "delete": function _delete(id, headers) {
            return refEndpoint["delete"](id, headers).then(function (serverResponse) {
                return responseBuilder(serverResponse);
            });
        },

        url: function url() {
            return [parent.url(), name].join("/");
        } };

    return assign(resource(refEndpoint), model);
}