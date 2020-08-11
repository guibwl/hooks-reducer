function reducerWrapper(reducer, state, action, done = false) {

  if (typeof reducer.value.done === 'undefined')
    reducer.value.done = done;

  if (typeof reducer.value.done === 'boolean')
    done = reducer.value.done;

  if (!action && done)
    return state;

  if (!action)
    return [state, null];

  let result;

  try {
    result = reducer.value(state, action);
  } catch (error) {

  }

  if (result && done) {
    return {...state, [reducer.key]: result};
  } else if (result) {
    return [{...state, [reducer.key]: result}, null];
  } else if (done) {
    throw new Error('Reducer hooks can`t found matched "type".');
  } else {
    return [state, action];
  }
}


function compose(...functions) {

  if (Array.isArray(functions) && functions.length > 0) {

        return functions.reduce((res, fn, i) => (...args) => {
            const _res = res(...args);

            if (Array.isArray(_res))
                return fn(..._res, functions.length-1 === i)
            else
                return fn(_res)
        }
    )
  }
  if (Array.isArray(functions) && functions.length === 1) {
    return functions[0]
  }
  return () => new Error('compose 函数接收的参数错误')
}



function mergeReducer(mergedReducer) {
  const reducerWrappers = [];

  for (const key in mergedReducer) {
    if (mergedReducer.hasOwnProperty(key)) {
      reducerWrappers.push(
        reducerWrapper.bind(this, {key: key, value: mergedReducer[key]})
      );
    }
  }

  return compose(...reducerWrappers);
}


export default mergeReducer;


/* mock data */

/*
function reducer1(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function reducer2(state, action) {
    switch (action.type) {
      case 'increment2':
        return {count: 100};
      case 'decrement3':
        return {count: 200};
      default:
        throw new Error();
    }
}

const _mockresult = {
  reducer1,
  reducer2
}

// mergeReducer(_mockresult);

*/
