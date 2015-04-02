"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

module.exports = endpoint;

var assign = _interopRequire(require("object-assign"));

var configurable = _interopRequire(require("../util/configurable"));

var entity = _interopRequire(require("./entity"));

function endpoint(url, parent) {
    var config = {
        _parent: parent,
        headers: {},
        requestInterceptors: [],
        responseInterceptors: [] };

    /**
     * Merge the local request interceptors and the parent's ones
     * @private
     * @return {array} request interceptors
     */
    function _getRequestInterceptors() {
        var current = model,
            requestInterceptors = [];

        while (current) {
            requestInterceptors = requestInterceptors.concat(current.requestInterceptors());

            current = current._parent ? current._parent() : null;
        }

        return requestInterceptors;
    };

    /**
     * Merge the local response interceptors and the parent's ones
     * @private
     * @return {array} response interceptors
     */
    function _getResponseInterceptors() {
        var current = model,
            responseInterceptors = [];

        while (current) {
            responseInterceptors = responseInterceptors.concat(current.responseInterceptors());

            current = current._parent ? current._parent() : null;
        }

        return responseInterceptors;
    };

    /**
     * Merge the local headers and the parent's ones
     * @private
     * @return {array} headers
     */
    function _getHeaders() {
        var current = model,
            headers = {};

        while (current) {
            assign(headers, current.headers());

            current = current._parent ? current._parent() : null;
        }

        return headers;
    };

    function _generateRequestConfig(url) {
        var params = arguments[1] === undefined ? {} : arguments[1];
        var headers = arguments[2] === undefined ? {} : arguments[2];
        var data = arguments[3] === undefined ? null : arguments[3];

        var config = {
            url: url,
            params: params || {},
            headers: assign({}, _getHeaders(), headers || {}),
            responseInterceptors: _getResponseInterceptors() };

        if (data) {
            config.data = data;
            config.requestInterceptors = _getRequestInterceptors();
        }

        return config;
    }

    var model = {
        get: function get(id, params, headers) {
            return config._parent().request("get", _generateRequestConfig(url + "/" + id, params, headers));
        },

        getAll: function getAll(params, headers) {
            return config._parent().request("get", _generateRequestConfig(url, params, headers));
        },

        post: function post(data, headers) {
            headers = headers || {};

            if (!headers["Content-Type"]) {
                headers["Content-Type"] = "application/json;charset=UTF-8";
            }

            return config._parent().request("post", _generateRequestConfig(url, {}, headers, data));
        },

        put: function put(id, data, headers) {
            headers = headers || {};

            if (!headers["Content-Type"]) {
                headers["Content-Type"] = "application/json;charset=UTF-8";
            }

            return config._parent().request("put", _generateRequestConfig(url + "/" + id, {}, headers, data));
        },

        patch: function patch(id, data, headers) {
            headers = headers || {};

            if (!headers["Content-Type"]) {
                headers["Content-Type"] = "application/json;charset=UTF-8";
            }

            return config._parent().request("patch", _generateRequestConfig(url + "/" + id, {}, headers, data));
        },

        "delete": function _delete(id, headers) {
            return config._parent().request("delete", _generateRequestConfig(url + "/" + id, {}, headers));
        },

        head: function head(id, headers) {
            return config._parent().request("head", _generateRequestConfig(url + "/" + id, {}, headers));
        } };

    model = assign(function () {
        return config._parent();
    }, model);

    configurable(model, config);

    return model;
}