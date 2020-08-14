(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.HooksReducer = {}, global.React));
}(this, (function (exports, React) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  var HooksContext = React__default.createContext(null);
  var initState = Object.create(null);
  var initAction = Object.create(null);
  var initStore;
  function HooksProvider(props) {
    if (!initStore) initStore = props.hooksStore(initState, initAction);

    var _useReducer = React.useReducer(props.hooksStore, initStore),
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

    return React__default.createElement(HooksContext.Provider, {
      value: [state, dispatch]
    }, React__default.cloneElement(_children, _props));
  }

  var _state, _dispatch;

  var dispatchHandler = function dispatchHandler(actionResult) {
    if (typeof actionResult === 'function') {
      actionResult(_state, dispatchHandler);
    }

    if (Object.prototype.toString.call(actionResult) === "[object Object]") {
      if (typeof actionResult.type !== 'string') throw new Error('Type is required and expect "string"');

      _dispatch(actionResult);
    }
  };

  function actionsWrapper(action) {
    return function () {
      var actionResult = action.apply(void 0, arguments);
      dispatchHandler(actionResult);
    };
  }

  function actionsHandler(actions) {
    if (!actions) return;

    var _action = Object.create(null);

    for (var name in actions) {
      if (actions.hasOwnProperty(name)) {
        _action[name] = actionsWrapper(actions[name]);
      }
    }

    return _action;
  }

  function Connect(component, reducerName, actions, actionName) {
    return function (props) {
      var _extends2;

      var _useContext = React.useContext(HooksContext),
          state = _useContext[0],
          dispatch = _useContext[1];

      _state = state;
      _dispatch = dispatch;

      var _props = _extends({}, props, (_extends2 = {}, _extends2[reducerName] = [state, dispatch], _extends2));

      if (actionName) _props[actionName] = actionsHandler(actions);
      return React__default.createElement(component, _props);
    };
  }

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

  exports.HooksProvider = HooksProvider;
  exports.connect = Connect;
  exports.mergeReducer = mergeReducer;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=hooks-reducer.js.map
