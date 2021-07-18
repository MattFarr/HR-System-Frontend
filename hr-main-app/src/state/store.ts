import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/index";
import thunk from "redux-thunk";
import { saveState } from "../helpers/localStorage/localStorageHelper";
import { throttle } from "lodash";

export const store = createStore(reducers, {}, applyMiddleware(thunk));

store.subscribe(
  throttle(() => {
    saveState("employeeStorage", store.getState().employees);
  }, 1000)
);
