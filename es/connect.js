import _extends from "@babel/runtime/helpers/esm/extends";
import React, { useContext } from 'react';
import { HooksContext } from './provider';

var _state, _dispatch;

var dispatchHandler = function dispatchHandler(actionResult) {
  if (typeof actionResult === 'function') {
    return actionResult(_state, dispatchHandler);
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

export default function Connect(component, reducerName, actions, actionName) {
  return function (props) {
    var _extends2;

    var _useContext = useContext(HooksContext),
        state = _useContext[0],
        dispatch = _useContext[1];

    _state = state;
    _dispatch = dispatch;

    var _props = _extends({}, props, (_extends2 = {}, _extends2[reducerName] = [state, dispatch], _extends2));

    if (actionName) _props[actionName] = actionsHandler(actions);
    return React.createElement(component, _props);
  };
}