import { combineReducers } from "redux";
import accountReducer from "./accountReducer";

const reducers = combineReducers({
  account: accountReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
