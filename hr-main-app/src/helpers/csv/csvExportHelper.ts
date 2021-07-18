import { Employee } from "../../models/employee/employee";

export const exportEmployeesToCSV = (employees: Employee[]) => {
  if (!employees.length) {
    alert("No Employees found to be exported");
    return;
  }

  let propertyList: string[] = [];

  const getCsvHeaders = (obj: any) => {
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] == "object") {
          getCsvHeaders(obj[property]);
        } else {
          propertyList.push(property);
        }
      }
    }
    return `${Object.values(propertyList).join(",")}\r\n`;
  };

  let csvText = getCsvHeaders(employees[0]);

  employees.forEach((employee) => {
    csvText += `${employee.id},${employee.firstName},${employee.lastName},${employee.title},${employee.grade},${employee.manager},${employee.annualSalary.amount},${employee.annualSalary.currency},${employee.startDate}\r\n`;
  });

  var a = document.createElement("a");
  a.href = "data:text/csv," + encodeURIComponent(csvText);
  a.target = "_blank";
  a.download = "employees.csv";
  document.body.appendChild(a);
  a.click();
};
