import { EmployeeActionType } from "../action-types/employeeActionTypes";
import { Dispatch } from "redux";
import { EmployeeAction } from "../actions/employeeActions";
import { Employee } from "../../models/employee";

export const addEmployee = (employee: Employee) => {
  return (dispatch: Dispatch<EmployeeAction>) => {
    dispatch({
      type: EmployeeActionType.ADD,
      payload: employee,
    });
  };
};

export const removeEmployee = (id: number) => {
  return (dispatch: Dispatch<EmployeeAction>) => {
    dispatch({
      type: EmployeeActionType.REMOVE,
      payload: id,
    });
  };
};
