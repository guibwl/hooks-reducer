import React, {useReducer} from 'react';

export const HooksContext = React.createContext(null);

const initState = Object.create(null);
const initAction = Object.create(null);
let initStore;

export default function HooksProvider(props) {

    if (!initStore)
        initStore = props.hooksStore(initState, initAction);

    const [state, dispatch] = useReducer(
        props.hooksStore,
        initStore
    );

    const _children = props.children;
    const _props = {};

    for (const key in props) {
        if (props.hasOwnProperty(key)) {
            if (key !== 'children') {
                _props[key] = props[key];
            }
        }
    }

    return React.createElement(
        HooksContext.Provider,
        {value: [state, dispatch]},
        React.cloneElement(_children, _props)
    )
}

