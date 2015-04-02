"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

module.exports = resource;

var assign = _interopRequire(require("object-assign"));

function resource(refEndpoint) {
    function model() {
        return refEndpoint;
    }

    model = assign(model, {
        addRequestInterceptor: function addRequestInterceptor(interceptor) {
            refEndpoint.requestInterceptors().push(interceptor);

            return model;
        },

        requestInterceptors: function requestInterceptors() {
            return refEndpoint.requestInterceptors();
        },

        addResponseInterceptor: function addResponseInterceptor(interceptor) {
            refEndpoint.responseInterceptors().push(interceptor);

            return model;
        },

        responseInterceptors: function responseInterceptors() {
            return refEndpoint.responseInterceptors;
        },

        header: function header(name, value) {
            refEndpoint.headers()[name] = value;

            return model;
        },

        headers: function headers() {
            return refEndpoint.headers();
        } });

    return model;
}