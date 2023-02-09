const { createStore, combineReducers, applyMiddleware } = require("redux");
const redux = require("redux");
const { createLogger } = require("redux-logger");

const logger = createLogger();

const BUY_CAKE = "BUY_CAKE";
const BUY_ICE_CREAM = "BUY_ICECREAM";

// puprose
function tobuycake() {
  return {
    type: BUY_CAKE,
    info: "first redux acion",
  };
}
function tobuyicecream() {
  return {
    type: BUY_ICE_CREAM,
    info: "sendon redux ",
  };
}

const initialState = {
  numberOfCakes: 10,
  numberOfIcecream: 20,
};
const initialStateCake = {
  numberOfCakes: 10,
};
const initialStateIceCream = {
  numberOfIcecream: 20,
};

// reducer=shopkeeper ==
const reducercake = (state = initialStateCake, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };
    default:
      return state;
  }
};

// reducer for icecream
const reducerIceCream = (state = initialStateIceCream, action) => {
  switch (action.type) {
    case BUY_ICE_CREAM:
      return {
        ...state,
        numberOfIcecream: state.numberOfIcecream - 2,
      };

    default:
      return state;
  }
};

// const redux = require("redux");
// const createStore = redux.createStore();
const rootReducer = combineReducers({
  cake: reducercake,
  iceCream: reducerIceCream,
});
const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Intail state", store.getState());
const unsubscribe = store.subscribe(() => {});
store.dispatch(tobuycake());
store.dispatch(tobuycake());
store.dispatch(tobuycake());
store.dispatch(tobuyicecream());
store.dispatch(tobuyicecream());
store.dispatch(tobuyicecream());
unsubscribe();
