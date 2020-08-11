import _extends from "@babel/runtime/helpers/esm/extends";
import React, { useContext } from 'react';
import { HooksContext } from './provider';

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

export default function Connect(component, reducerName, actions, actionName) {
  return function (props) {
    var _extends2;

    var _useContext = useContext(HooksContext),
        state = _useContext[0],
        dispatch = _useContext[1];

    _state = state;
    _dispatch = dispatch;
    var enhancedActions = actionsHandler(actions);

    var _props = _extends({}, props, (_extends2 = {}, _extends2[reducerName] = [state, dispatch], _extends2));

    if (actionName) {
      _props[actionName] = enhancedActions;
    }

    return React.createElement(component, _props);
  };
}