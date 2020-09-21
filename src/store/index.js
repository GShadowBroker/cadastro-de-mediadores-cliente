import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./authReducer";
import registrationReducer from "./registrationReducer";

const rootReducer = combineReducers({
  authReducer,
  registrationReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => console.log(store.getState()));

export default store;
