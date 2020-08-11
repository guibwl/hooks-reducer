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
  var initialState = {};
  function HooksProvider(props) {
    var _useReducer = React.useReducer(props.hooksStore, initialState),
        state = _useReducer[0],
        dispatch = _useReducer[1];

    return React__default.createElement(HooksContext.Provider, {
      value: [state, dispatch]
    }, React__default.cloneElement(props.children, props));
  }

  var _state, _dispatch;

  var dispatchWrapper = function dispatchWrapper(action) {
    if (typeof action === 'function') {
      action(_state, dispatchWrapper);
    }

    if (Object.prototype.toString.call(action) === "[object Object]") {
      if (typeof action.type !== 'string') throw new Error('Type is required and expect "string"');

      _dispatch(action);
    }
  };

  function actionsWrapper(action) {
    return function () {
      var result = action.apply(void 0, arguments);

      if (typeof result === 'function') {
        result(_state, dispatchWrapper);
      }

      if (Object.prototype.toString.call(result) === "[object Object]") {
        if (typeof result.type !== 'string') throw new Error('Type is required and expect "string"');

        _dispatch(result);
      }
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
      var enhancedActions = actionsHandler(actions);

      var _props = _extends({}, props, (_extends2 = {}, _extends2[reducerName] = [state, dispatch], _extends2));

      if (actionName) {
        _props[actionName] = enhancedActions;
      }

      return React__default.createElement(component, _props);
    };
  }

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

      return _extends({}, state, (_extends2 = {}, _extends2[reducer.key] = result, _extends2));
    } else if (result) {
      var _extends3;

      return [_extends({}, state, (_extends3 = {}, _extends3[reducer.key] = result, _extends3)), null];
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

  exports.HooksProvider = HooksProvider;
  exports.connect = Connect;
  exports.mergeReducer = mergeReducer;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=hooks-reducer.js.map
