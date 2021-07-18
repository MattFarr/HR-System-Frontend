import { Employee } from "../../models/employee/employee";
import { EmployeeActionType } from "../action-types/employeeActionTypes";

interface AddEmployeeAction {
  type: EmployeeActionType.ADD;
  payload: Employee;
}

interface DeleteEmployeeAction {
  type: EmployeeActionType.REMOVE;
  payload: number;
}

export type EmployeeAction = AddEmployeeAction | DeleteEmployeeAction;
