import React, {useReducer} from 'react';


export const HooksContext = React.createContext(null);


const initialState = {};

export default function HooksProvider(props) {
    const [state, dispatch] = useReducer(
        props.hooksStore,
        initialState
    );

    return React.createElement(
        HooksContext.Provider,
        {value: [state, dispatch]},
        React.cloneElement(
          props.children,
          props
        )
    )
}

