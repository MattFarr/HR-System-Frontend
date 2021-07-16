import { AnnualSalary } from "./annualSalary";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  annualSalary: AnnualSalary;
  startDate: string;
}
