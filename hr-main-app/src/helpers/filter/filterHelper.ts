import { Employee } from "../../models/employee/employee";

export const filterEmployeeByName = (
  list: Employee[],
  filter: string | undefined
): Employee[] | null => {
  return filter
    ? list.filter((employee: Employee) =>
        `${employee.firstName} ${employee.lastName}`
          .toLowerCase()
          .includes(filter.toLowerCase())
      )
    : null;
};
