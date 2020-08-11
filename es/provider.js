import React, { useReducer } from 'react';
export var HooksContext = React.createContext(null);
var initialState = {};
export default function HooksProvider(props) {
  var _useReducer = useReducer(props.hooksStore, initialState),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  return React.createElement(HooksContext.Provider, {
    value: [state, dispatch]
  }, React.cloneElement(props.children, props));
}