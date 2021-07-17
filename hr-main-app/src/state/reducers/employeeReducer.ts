import { EmployeeActionType } from "../action-types/employeeActionTypes";
import { EmployeeAction } from "../actions/employeeActions";
import initialEmployeeData from "../../data/mock-data.json";
import { EmployeeState } from "../state-models/employeeState";

const initialState: EmployeeState = { employees: initialEmployeeData };

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
