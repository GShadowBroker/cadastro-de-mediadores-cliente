import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  authReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

store.subscribe(() => console.log(store.getState()));

export default store;
