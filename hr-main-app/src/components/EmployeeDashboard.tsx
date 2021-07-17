/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, TextField } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { orderBy } from "lodash";
import initialEmployeeData from "../data/mock-data.json";
import { Employee } from "../models/employee";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { employeeActionCreators, State } from "../state";
import EmployeeForm from "./EmployeeForm";

interface ISort {
  field: string;
  direction: boolean | "asc" | "desc";
}

const EmployeeDashboard = (): JSX.Element => {
  const dispatch = useDispatch();
  const { addEmployee, removeEmployee } = bindActionCreators(
    employeeActionCreators,
    dispatch
  );
  const employeesState = useSelector((state: State) => state.employees);

  const [employees, setEmployees] = useState<Employee[]>(
    employeesState.employees
  );
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState<ISort>({
    field: "",
    direction: "asc",
  });

  const updateSort = (field: string) => {
    setSort({
      field,
      direction:
        field !== sort.field
          ? "asc"
          : sort.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const addEmployeeConst = () => {
    let employeeSample: Employee = {
      id: 6,
      firstName: "Matthew",
      lastName: "Farrugia",
      startDate: "2020-03-03",
      annualSalary: {
        amount: 2000,
        currency: "USD",
      },
    };

    addEmployee(employeeSample);
  };

  const exportToCSV = () => {
    if (!employees.length) {
      alert("Nothing to export");
      return;
    }
    let csvText = `${Object.keys(employees[0]).join(",")}\r\n`;
    employees.forEach((employee) => {
      csvText += `${employee.annualSalary.amount},${employee.firstName},${employee.lastName},${employee.annualSalary.amount} ${employee.annualSalary.currency},${employee.startDate}\r\n`;
    });

    var a = document.createElement("a");
    a.href = "data:attachment/csv," + encodeURIComponent(csvText);
    a.target = "_blank";
    a.download = "myFile.csv";
    document.body.appendChild(a);
    a.click();
  };

  useEffect(() => {
    setEmployees(employeesState.employees);
  }, [employeesState]);

  useEffect(() => {
    let list = employees;
    if (filter) {
      list = list.filter((employee: Employee) =>
        `${employee.firstName} ${employee.lastName}`
          .toLowerCase()
          .includes(filter.toLowerCase())
      );
    } else {
      list = initialEmployeeData;
    }
    setEmployees(list);
  }, [filter]);

  useEffect(() => {
    let list = employees;
    if (sort) {
      list = orderBy(list, [sort.field], [sort.direction]);
    }
    setEmployees(list);
  }, [sort]);

  return (
    <Box>
      <EmployeeForm addEmployee={addEmployee} />
      <TextField
        type="text"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      />
      <Button onClick={() => setFilter(undefined)}>Clear</Button>
      <Button onClick={() => updateSort("firstName")}>Sort by Name</Button>
      <Button onClick={() => updateSort("annualSalary.amount")}>
        Sort by Amount
      </Button>
      <Button onClick={() => updateSort("startDate")}>Sort by Date</Button>
      <Button onClick={exportToCSV}>Export to CSV</Button>
      <Button onClick={addEmployeeConst}>Add Employee</Button>

      <h1>Employee List</h1>
      <small>
        Sorted by {sort.field} in {sort.direction} order
      </small>
      {employees.map((employee: Employee) => (
        <Box flexDirection="row" display="flex" key={employee.id}>
          <p>{employee.firstName}</p>
          <p>{employee.lastName}</p>
          <p>{employee.annualSalary.amount}</p>
          <p>{employee.annualSalary.currency}</p>
          <p>{employee.startDate} </p>
          <Button onClick={() => removeEmployee(employee.id)}>
            Remove Employee
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default EmployeeDashboard;
