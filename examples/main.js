import React, {useEffect} from 'react'
import ReactDom from 'react-dom'
import {HooksProvider, mergeReducer, connect} from '../src';

const initState = [0,1,2,3,4,5,6,7,8];

function squareReducer(state = {values: initState}, action) {
    
    switch (action.type) {
        
        case 'increment':
            const {key, value} = action.payLoad;
            state.values[key] = value;
          return {values: state.values};

        default:
          return state;
    }
}


const initState2 = [0,1,2,3,4,5,6,7,8];

function squareReducer2(state = {values: initState2}, action) {
    
    switch (action.type) {
        
        case 'increment2':
            const {key, value} = action.payLoad;
            state.values[key] = value;
          return {values: state.values};

        default:
          return state;
    }
}

const store = mergeReducer({squareReducer, squareReducer2, incrementNumReducer});

const incrementAction = (key, value) => (state, dispatch) => {
    
    dispatch({type: 'increment2', payLoad: {key, value}});
};


const Square = connect(
    square,
    'reducer',
    {incrementAction},
    'actions'
);


function square(props) {

    const [state] = props.reducer;
    const {incrementAction} = props.actions;

    console.log(JSON.stringify(state));
    
    useEffect(() => {
        incrementAction(props.value, props.value + 1)
    }, [])

    return (
        <button
          className="square"
          onClick={() => {
            incrementAction(props.value, state.squareReducer2.values[props.value] + 1)
          }}
        >
         {state.squareReducer2.values[props.value]}
        </button>
      );
}



function incrementNumReducer(state={num: 0}, action) {
    switch (action.type) {
        case 'incrementNum':
            return {num: action.num}
        default:
            return state;
    }
}



function incrementNumAction(num) {
    return {
        type: 'incrementNum',
        num
    }
}

const Board = connect(
    board,
    'reducer',
    {incrementNumAction},
    'actions'
);

function board(props) {
    const {num} = props.reducer[0].incrementNumReducer;
    const {incrementNumAction} = props.actions;

    function renderSquare(i) {
        return (
          <Square
            value={i}
          />
        );
    }

    return (
        <div>
        <button onClick={incrementNumAction.bind(null, num+1)}>
            {num}
        </button>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
    );
}


function App() {

    return (
        <HooksProvider hooksStore={store}>
            <Board/>
        </HooksProvider>
    )
}

ReactDom.render(
    <App/>,
    document.getElementById('root')
);
