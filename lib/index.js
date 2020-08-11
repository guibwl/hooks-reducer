"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.HooksProvider = exports.mergeReducer = exports.connect = void 0;

var _connect = _interopRequireDefault(require("./connect"));

exports.connect = _connect["default"];

var _mergeReducer = _interopRequireDefault(require("./mergeReducer"));

exports.mergeReducer = _mergeReducer["default"];

var _provider = _interopRequireDefault(require("./provider"));

exports.HooksProvider = _provider["default"];