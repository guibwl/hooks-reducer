## Why
Your may like use Redux to manage and share a global state in your Application,
but you also like to use React-hooks. hooks-reducer let you keep Redux programming mode.
so you can easy to switch React.Component and Redux to React-hooks and hooks-reducer.

## feature
- Use with React hooks.
- Global state in Application.
- Share state to any descendant component.
- Keep Redux programming mode, easy to update for old application.


## Usage

#### Inject store to your Application.
```jsx
import {HooksProvider} from 'hooks-reducer';
import rootReducer from './yourConfigs/rootReducer.js';

const store = rootReducer;

function App() {

    return (
        <HooksProvider hooksStore={store}>
            <MyComponent/>
        </HooksProvider>
    )
}

ReactDom.render(
    <App/>,
    document.getElementById('root')
);

```

#### Use mergeReducer to combine your reducers.
```js
import {mergeReducer} from 'hooks-reducer';
import * as reducerFoo from './pageFoo/reducerFoo.js';
import * as reducerBar from './pageBar/reducerBar.js';

const rootReducer = mergeReducer({
    reducerFoo,
    reducerBar
});

export default rootReducer;
```


#### Connect your component and hooks-reducer, get state and action.
```jsx
import {useEffect} from 'react';
import {connect} from 'hooks-reducer';

const enhancedAction = (data) => (state, dispatch) => {
    // request service or do some other things...
    dispatch({type: 'enhancedAction', data: data});
};

const generalAction = (data) =>
    ({type: 'enhancedAction', data: data});

function Component(props) {
    const [state, dispatch] = props.reducer;
    // Get your state in props.reducer;
    // Don`t recommend you use dispatch, should use action instead.

    const {generalAction, enhancedAction} = props.actions;
    // Get your actions in props.actions;

    useEffect(() => {
        enhancedAction('Any type of data');
    }, []);

    console.log('My state: ', state);

    return (
        <div>
            Hello world!
            <button onClick={generalAction.bind(null, 'Any type of data')}>
                Action now!
            </button>
        </div>
    )
}

const MyComponent = connect(
    Component,
    'reducer', // Define your reducer key name in props
    {
        enhancedAction,
        generalAction
        // Define more action...
    },
    'actions' // Define your actions key name in props
);

export default MyComponent;
```

#### Example of reducer:

```js
const initialState = {
    data: ''// Any type of data.
};

function reducerBar(state=initialState, action) {
    switch (action.type) {
        case 'updateData':
            return {...state, data: action.data};
        case 'resetData':
            return initialState;
        default:
            return state;
    }
}

export default reducerBar;
```