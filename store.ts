import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { reducer } from "./src/state/root-reducer";
import { createLogger, LogEntryObject } from "redux-logger";
import swapSaga from "./src/state/swap/sagas";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}
window.__REDUX_DEVTOOLS_EXTENSION__ = window.__REDUX_DEVTOOLS_EXTENSION__ || {};

export default function configureStore(initialState: any): any {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancers = [];

  if (process.env.NODE_ENV === "development") {
    middlewares.push(
      // @ts-ignore
      createLogger({
        collapsed: (
          _getState: () => any,
          action: any,
          logEntry: LogEntryObject
        ) => !logEntry.error,
      })
    );

    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
    if (typeof devToolsExtension === "function") {
      enhancers.push(devToolsExtension());
    }
  }

  const composeEnhancers = compose(
    applyMiddleware(...middlewares),
    ...enhancers
  );

  // @ts-ignore
  const store = createStore(reducer, initialState, composeEnhancers);
  store.runSaga = sagaMiddleware.run(swapSaga);
  return store;
}
