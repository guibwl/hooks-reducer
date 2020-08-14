import React, {useContext} from 'react';
import {HooksContext} from './provider';

let _state, _dispatch;

const dispatchHandler = (actionResult) => {

  if (typeof actionResult === 'function') {
    actionResult(_state, dispatchHandler);
  }

  if (Object.prototype.toString.call(actionResult) === "[object Object]") {

    if (typeof actionResult.type !== 'string')
        throw new Error('Type is required and expect "string"');
    _dispatch(actionResult);
  }
}

function actionsWrapper(action) {

  return (...args) => {

    const actionResult = action(...args);

    dispatchHandler(actionResult);
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

      const _props = {
          ...props,
          [reducerName]: [state, dispatch]
      }

      if (actionName)
          _props[actionName] = actionsHandler(actions);

      return React.createElement(
        component,
        _props
      )
    }
}
