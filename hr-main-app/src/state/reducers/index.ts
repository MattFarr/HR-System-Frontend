import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import employeeReducer from "./employeeReducer";

const reducers = combineReducers({
  account: accountReducer,
  employees: employeeReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
