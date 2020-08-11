"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = HooksProvider;
exports.HooksContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var HooksContext = _react["default"].createContext(null);

exports.HooksContext = HooksContext;
var initialState = {};

function HooksProvider(props) {
  var _useReducer = (0, _react.useReducer)(props.hooksStore, initialState),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  return _react["default"].createElement(HooksContext.Provider, {
    value: [state, dispatch]
  }, _react["default"].cloneElement(props.children, props));
}