
function compose(...functions) {

  if (Array.isArray(functions) && functions.length > 1)
        return functions.reduce(
            (fn, nextFn) =>
                    (...args) =>
                        nextFn(fn(...args)));

  if (Array.isArray(functions) && functions.length === 1)
        return functions[0];
  
  return () => new Error('compose 函数接收的参数错误')
}

const store = {};

function reducersWrapper(reducers) {
  return reducers.map(({key, reducer, done}) => {
    return (state, action) => {

      if (Array.isArray(state) && !action)
          [state, action] = state;
      
      store[key] = reducer(state[key], action) || Object.create(null);

      if (done)
        return {...store};

      return [state, action];
    }
  })
}


function mergeReducer(mergedReducer) {

  const reducersKeys = Object.keys(mergedReducer);
  const reducers = reducersKeys.map((key, i, arr) => {
      return {
        key: key,
        reducer: mergedReducer[key],
        done: (i+1) === arr.length
      }
  })

  return compose(...reducersWrapper(reducers));
}


export default mergeReducer;