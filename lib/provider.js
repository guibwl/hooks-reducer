"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = HooksProvider;
exports.HooksContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var HooksContext = _react["default"].createContext(null);

exports.HooksContext = HooksContext;
var initState = Object.create(null);
var initAction = Object.create(null);
var initStore;

function HooksProvider(props) {
  if (!initStore) initStore = props.hooksStore(initState, initAction);

  var _useReducer = (0, _react.useReducer)(props.hooksStore, initStore),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  var _children = props.children;
  var _props = {};

  for (var key in props) {
    if (props.hasOwnProperty(key)) {
      if (key !== 'children') {
        _props[key] = props[key];
      }
    }
  }

  return _react["default"].createElement(HooksContext.Provider, {
    value: [state, dispatch]
  }, _react["default"].cloneElement(_children, _props));
}