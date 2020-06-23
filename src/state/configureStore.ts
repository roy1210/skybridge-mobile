import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import { reducer as swapReducer } from "./swap/reducers";
import { reducer as explorerReducer } from "./explorer/reducers";
import { reducer as settingsReducer } from "./settings/reducers";
import explorerSaga from "./explorer/sagas";
import swapSaga from "./swap/sagas";
import settingsSaga from "./settings/sagas";

export const rootReducer = combineReducers({
  swap: swapReducer,
  explorer: explorerReducer,
  settings: settingsReducer,
});

export function* rootSaga() {
  yield all([fork(swapSaga), fork(explorerSaga), fork(settingsSaga)]);
}
