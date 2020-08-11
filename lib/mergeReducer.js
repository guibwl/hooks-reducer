"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends4 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

function reducerWrapper(reducer, state, action, done) {
  if (done === void 0) {
    done = false;
  }

  if (typeof reducer.value.done === 'undefined') reducer.value.done = done;
  if (typeof reducer.value.done === 'boolean') done = reducer.value.done;
  if (!action && done) return state;
  if (!action) return [state, null];
  var result;

  try {
    result = reducer.value(state, action);
  } catch (error) {}

  if (result && done) {
    var _extends2;

    return (0, _extends4["default"])({}, state, (_extends2 = {}, _extends2[reducer.key] = result, _extends2));
  } else if (result) {
    var _extends3;

    return [(0, _extends4["default"])({}, state, (_extends3 = {}, _extends3[reducer.key] = result, _extends3)), null];
  } else if (done) {
    throw new Error('Reducer hooks can`t found matched "type".');
  } else {
    return [state, action];
  }
}

function compose() {
  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  if (Array.isArray(functions) && functions.length > 0) {
    return functions.reduce(function (res, fn, i) {
      return function () {
        var _res = res.apply(void 0, arguments);

        if (Array.isArray(_res)) return fn.apply(void 0, _res.concat([functions.length - 1 === i]));else return fn(_res);
      };
    });
  }

  if (Array.isArray(functions) && functions.length === 1) {
    return functions[0];
  }

  return function () {
    return new Error('compose 函数接收的参数错误');
  };
}

function mergeReducer(mergedReducer) {
  var reducerWrappers = [];

  for (var key in mergedReducer) {
    if (mergedReducer.hasOwnProperty(key)) {
      reducerWrappers.push(reducerWrapper.bind(this, {
        key: key,
        value: mergedReducer[key]
      }));
    }
  }

  return compose.apply(void 0, reducerWrappers);
}

var _default = mergeReducer;
/* mock data */

/*
function reducer1(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function reducer2(state, action) {
    switch (action.type) {
      case 'increment2':
        return {count: 100};
      case 'decrement3':
        return {count: 200};
      default:
        throw new Error();
    }
}

const _mockresult = {
  reducer1,
  reducer2
}

// mergeReducer(_mockresult);

*/

exports["default"] = _default;