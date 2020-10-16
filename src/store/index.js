import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./authReducer";
import registrationReducer from "./registrationReducer";
import mediatorsReducer from "./mediatorsReducer";
import camarasReducer from "./camarasReducer";

const rootReducer = combineReducers({
  authReducer,
  registrationReducer,
  mediatorsReducer,
  camarasReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

/* store.subscribe(() => console.log(store.getState())); */

export default store;
