import React, {useContext} from 'react';
import {HooksContext} from './provider';

let _state, _dispatch;

const dispatchWrapper = (action) => {

  if (typeof action === 'function') {
    action(_state, dispatchWrapper);
  }

  if (Object.prototype.toString.call(action) === "[object Object]") {

    if (typeof action.type !== 'string')
        throw new Error('Type is required and expect "string"');
    _dispatch(action);
  }
}

function actionsWrapper(action) {

  return (...args) => {

    const result = action(...args);

    if (typeof result === 'function') {
      result(_state, dispatchWrapper);
    }

    if (Object.prototype.toString.call(result) === "[object Object]") {

      if (typeof result.type !== 'string')
          throw new Error('Type is required and expect "string"');
      _dispatch(result);
    }
  }
}


function actionsHandler(actions) {
  if (!actions) 
    return;

  const _action = Object.create(null);

  for (const name in actions) {
    if (actions.hasOwnProperty(name)) {
      
      _action[name] = actionsWrapper(actions[name]);
    }
  }

  return _action;
}


export default function Connect(
  component,
  reducerName,
  actions,
  actionName
) {

    return function (props) {

      const [state, dispatch] = useContext(HooksContext);

      _state = state;

      _dispatch = dispatch;

      const enhancedActions = actionsHandler(actions);

      const _props = {
          ...props,
          [reducerName]: [state, dispatch]
      }

      if (actionName) {
        _props[actionName] = enhancedActions;
      }

      return React.createElement(
        component,
        _props
      )
    }
}
