import { combineReducers } from "redux";
import { reducer as userReducer } from "./swap/reducers";

const reducer = combineReducers({
  user: userReducer,
});

export { reducer };
