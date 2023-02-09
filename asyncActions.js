const { createStore, applyMiddleware } = require("redux");
const Redux_thunk = require("redux-thunk").default;
const axios = require("axios");

// state /store
const initialState = {
  laoding: false,
  users: [],
  error: "",
};

// action
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILUR";

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUsersFailur = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        laoding: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        laoding: false,
        user: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        laoding: false,
        user: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data?.map((user) => user.id + " " + user.name);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUsersFailur(error.message));
      });
    // )
  };
};
// axios.get('https://jsonplaceholder.typicode.com/users

//
const store = createStore(reducer, applyMiddleware(Redux_thunk));
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(fetchUsers());
