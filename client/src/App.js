import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ChatsList from "./components/ChatsList";
import Login from "./components/Login";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
import thunk from "redux-thunk";
const initialState = {
  username: "",
  chats: [],
  chatInView: {},
  socket: ""
};
const middleware = [thunk];

const store = createStore(
  appReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

function appReducer(state = initialState, action) {
  switch (action.type) {
    case "Login": {
      return {
        ...state,
        username: action.payload.username,
        chats: action.payload.chats,
        socket: action.payload.socket
      };
    }
    case "AddMessage": {
      return { ...state, chats: action.payload };
    }
    case "ChatInView": {
      return { ...state, chatInView: action.payload };
    }
    case "AddSocket": {
      return { ...state, socket: action.payload };
    }
    default: {
      return state;
    }
  }
}
export const Context = React.createContext();

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route exact path="/chats" component={ChatsList} />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
