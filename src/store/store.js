import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import numberConfigurationReducer from "./reducers/numberConfigurationReducer";
import nameConfigurationReducer from "./reducers/nameConfigurationReducer";

const rootReducer = combineReducers({
  numberConfiguration: numberConfigurationReducer,
  nameConfiguration: nameConfigurationReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
