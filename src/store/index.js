import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./authReducer";
import registrationReducer from "./registrationReducer";
import mediatorsReducer from "./mediatorsReducer";

const rootReducer = combineReducers({
  authReducer,
  registrationReducer,
  mediatorsReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => console.log(store.getState()));

export default store;
