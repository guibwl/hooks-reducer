import React, { useReducer } from 'react';
export var HooksContext = React.createContext(null);
var initState = Object.create(null);
var initAction = Object.create(null);
var initStore;
export default function HooksProvider(props) {
  if (!initStore) initStore = props.hooksStore(initState, initAction);

  var _useReducer = useReducer(props.hooksStore, initStore),
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

  return React.createElement(HooksContext.Provider, {
    value: [state, dispatch]
  }, React.cloneElement(_children, _props));
}