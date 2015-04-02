"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

module.exports = entity;

var assign = _interopRequire(require("object-assign"));

function entity(id, data, member) {
    var model = {
        one: function one(name, id) {
            return member.one(name, id);
        },

        all: function all(name) {
            return member.all(name);
        },

        save: function save(headers) {
            return member.put(data, headers);
        },

        remove: function remove(headers) {
            return member["delete"](headers);
        },

        url: function url() {
            return member.url();
        },

        id: (function (_id) {
            var _idWrapper = function id() {
                return _id.apply(this, arguments);
            };

            _idWrapper.toString = function () {
                return _id.toString();
            };

            return _idWrapper;
        })(function () {
            return id;
        }),

        data: (function (_data) {
            var _dataWrapper = function data() {
                return _data.apply(this, arguments);
            };

            _dataWrapper.toString = function () {
                return _data.toString();
            };

            return _dataWrapper;
        })(function () {
            return data;
        })
    };

    return assign(function () {
        return data;
    }, model);
}