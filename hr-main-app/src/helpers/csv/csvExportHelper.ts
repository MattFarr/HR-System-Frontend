import { Employee } from "../../models/employee/employee";

export const exportEmployeesToCSV = (employees: Employee[]) => {
  if (!employees.length) {
    alert("No Employees found to be exported");
    return;
  }

  let csvText = `${Object.keys(employees[0]).join(",")}\r\n`;

  employees.forEach((employee) => {
    csvText += `${employee.annualSalary.amount},${employee.firstName},${employee.lastName}, ${employee.annualSalary.currency}|${employee.annualSalary.amount},${employee.startDate}\r\n`;
  });

  //Export
  var a = document.createElement("a");
  a.href = "data:attachment/csv," + encodeURIComponent(csvText);
  a.target = "_blank";
  a.download = "employees.csv";
  document.body.appendChild(a);
  a.click();
};
