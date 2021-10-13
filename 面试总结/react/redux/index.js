function createStore(reducer) {

  this.listeners = [];
  let currentState;

  function getState() {
    return currentState
  }

  function dispatch(action) {
    currentState = reducer(currentState, action);
    listeners.forEach(cb => cb())
  }

  function subscribe(fn) {
    listeners.push(fn);
    return function unSunscribe() {
      listeners = listeners.filter((cb) => cb != fn)
    }
  }

  return {
    getState,
    dispatch,
    subscribe
  }
}


// redux 挂在中间件
function compose(middlewear) {
  return middlewear.reduce((a,b) => (...argus) => a(b(argus)))
}