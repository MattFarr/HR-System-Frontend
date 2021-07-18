import { AnnualSalary } from "./annualSalary";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  grade: string;
  manager: string;
  annualSalary: AnnualSalary;
  startDate: string;
}
