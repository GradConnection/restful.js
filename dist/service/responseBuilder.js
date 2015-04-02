"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var response = _interopRequire(require("../model/response"));

module.exports = function (serverResponse, memberFactory) {
    return new Promise(function (resolve, reject) {
        var status = serverResponse.status;

        if (status >= 200 && status < 400) {
            return resolve(response(serverResponse, memberFactory));
        }

        reject(response(serverResponse));
    });
};