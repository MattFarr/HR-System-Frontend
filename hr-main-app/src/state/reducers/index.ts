import { combineReducers } from "redux";
import employeeReducer from "./employeeReducer";

const reducers = combineReducers({
  employees: employeeReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
