"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

module.exports = response;

var assign = _interopRequire(require("object-assign"));

var entity = _interopRequire(require("./entity"));

function response(serverResponse, memberFactory) {
    var model = {
        status: function status() {
            return serverResponse.status;
        },

        body: function body() {
            var hydrate = arguments[0] === undefined ? true : arguments[0];

            if (!hydrate || !memberFactory) {
                return serverResponse.data;
            }

            if (Object.prototype.toString.call(serverResponse.data) === "[object Array]") {
                return serverResponse.data.map(function (datum) {
                    return entity(datum.id, datum, memberFactory(datum.id));
                });
            }

            return entity(serverResponse.data.id, serverResponse.data, memberFactory(serverResponse.data.id));
        },

        headers: function headers() {
            return serverResponse.headers;
        },

        config: function config() {
            return serverResponse.config;
        }
    };

    return assign(function () {
        return serverResponse;
    }, model);
}