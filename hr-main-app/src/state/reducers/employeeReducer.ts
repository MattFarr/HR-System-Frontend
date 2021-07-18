import { EmployeeActionType } from "../action-types/employeeActionTypes";
import { EmployeeAction } from "../actions/employeeActions";
import initialEmployeeData from "../../data/mock-data.json";
import { EmployeeState } from "../state-models/employeeState";
import { loadState } from "../../helpers/localStorage/localStorageHelper";

const getEmployeeList = () => {
  let state = loadState("employeeStorage");
  return state === undefined ? initialEmployeeData : state["employees"];
};

const initialState: EmployeeState = { employees: getEmployeeList() };

const accountReducer = (
  state: EmployeeState = initialState,
  action: EmployeeAction
) => {
  switch (action.type) {
    case EmployeeActionType.ADD:
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    case EmployeeActionType.REMOVE:
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default accountReducer;
