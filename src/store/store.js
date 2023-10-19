import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import numberConfigurationReducer from "./reducers/numberConfigurationReducer";
import nameConfigurationReducer from "./reducers/nameConfigurationReducer";
import criteriaConfigurationReducer from "./reducers/criteriaConfigurationReducer";
import alternativeConfigurationReducer from "./reducers/alternativeConfigurationReducer";

const rootReducer = combineReducers({
  numberConfiguration: numberConfigurationReducer,
  nameConfiguration: nameConfigurationReducer,
  criteriaConfiguration: criteriaConfigurationReducer,
  alternativeConfiguration: alternativeConfigurationReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
