import _extends from "@babel/runtime/helpers/esm/extends";

function compose() {
  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  if (Array.isArray(functions) && functions.length > 1) return functions.reduce(function (fn, nextFn) {
    return function () {
      return nextFn(fn.apply(void 0, arguments));
    };
  });
  if (Array.isArray(functions) && functions.length === 1) return functions[0];
  return function () {
    return new Error('compose 函数接收的参数错误');
  };
}

var store = {};

function reducersWrapper(reducers) {
  return reducers.map(function (_ref) {
    var key = _ref.key,
        reducer = _ref.reducer,
        done = _ref.done;
    return function (state, action) {
      if (Array.isArray(state) && !action) {
        var _state = state;
        state = _state[0];
        action = _state[1];
      }

      store[key] = reducer(state[key], action) || Object.create(null);
      if (done) return _extends({}, store);
      return [state, action];
    };
  });
}

function mergeReducer(mergedReducer) {
  var reducersKeys = Object.keys(mergedReducer);
  var reducers = reducersKeys.map(function (key, i, arr) {
    return {
      key: key,
      reducer: mergedReducer[key],
      done: i + 1 === arr.length
    };
  });
  return compose.apply(void 0, reducersWrapper(reducers));
}

export default mergeReducer;