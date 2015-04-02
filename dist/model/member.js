"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

module.exports = member;

var assign = _interopRequire(require("object-assign"));

var collection = _interopRequire(require("./collection"));

var endpoint = _interopRequire(require("./endpoint"));

var responseBuilder = _interopRequire(require("../service/responseBuilder"));

var resource = _interopRequire(require("./resource"));

function member(name, id, parent) {
    var refEndpoint = endpoint([parent.url(), name].join("/"), parent());

    var model = {

        get: function get(params, headers) {
            return refEndpoint.get(id, params, headers).then(function (serverResponse) {
                return responseBuilder(serverResponse, function () {
                    return model;
                });
            });
        },

        put: function put(data, headers) {
            return refEndpoint.put(id, data, headers).then(function (serverResponse) {
                return responseBuilder(serverResponse);
            });
        },

        patch: function patch(data, headers) {
            return refEndpoint.patch(id, data, headers).then(function (serverResponse) {
                return responseBuilder(serverResponse);
            });
        },

        head: function head(data, headers) {
            return refEndpoint.head(id, data, headers).then(function (serverResponse) {
                return responseBuilder(serverResponse);
            });
        },

        "delete": function _delete(headers) {
            return refEndpoint["delete"](id, headers).then(function (serverResponse) {
                return responseBuilder(serverResponse);
            });
        },

        one: function one(name, id) {
            return member(name, id, model);
        },

        all: function all(name) {
            return collection(name, model);
        },

        url: function url() {
            return [parent.url(), name, id].join("/");
        } };

    // We override model because one and all need it as a closure
    model = assign(resource(refEndpoint), model);

    return model;
}