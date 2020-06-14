import { combineReducers } from "redux";
import { reducer as swapReducer } from "./swap/reducers";

const reducer = combineReducers({
  swap: swapReducer,
});

export { reducer };
