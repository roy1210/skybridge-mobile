import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import { reducer as explorerReducer } from "./explorer/reducers";
import explorerSaga from "./explorer/sagas";
import swapSaga from "./swap/sagas";
import { reducer as swapReducer } from "./swap/reducers";

export const rootReducer = combineReducers({
  swap: swapReducer,
  explorer: explorerReducer,
});

export function* rootSaga() {
  yield all([fork(swapSaga), fork(explorerSaga)]);
}
