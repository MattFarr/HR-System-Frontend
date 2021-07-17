/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { orderBy } from "lodash";
import { Employee } from "../models/employee";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { employeeActionCreators, State } from "../state";
import EmployeeForm from "./EmployeeForm";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ClearIcon from "@material-ui/icons/Clear";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

interface ISort {
  field: string;
  direction: boolean | "asc" | "desc";
}

const useStyles = makeStyles(() => ({
  dashboardButton: {
    margin: "0 5px",
    width: "145px",
  },
}));

const EmployeeDashboard = (): JSX.Element => {
  const classes = useStyles();
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

  const [expandedId, setExpandedId] = useState(-1);

  const handleExpandClick = (i: number) => {
    setExpandedId(expandedId === i ? -1 : i);
  };

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

  const addNewEmployee = (employee: Employee) => {
    setFilter("");
    addEmployee(employee);
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
    let list = employeesState.employees;
    if (filter) {
      list = list.filter((employee: Employee) =>
        `${employee.firstName} ${employee.lastName}`
          .toLowerCase()
          .includes(filter.toLowerCase())
      );
    }
    if (sort) {
      list = orderBy(list, [sort.field], [sort.direction]);
    }
    setEmployees(list);
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
      list = employeesState.employees;
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
    <Box display="flex">
      <Box display="flex" width="70%" flexDirection="column" padding="20px">
        <Typography variant="h1">Employee Details</Typography>
        <Box
          display="flex"
          flexDirection="row"
          width="100%"
          marginTop="30px"
          justifyContent="space-between"
        >
          <Box display="flex">
            <TextField
              label="Search by name"
              type="text"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
              variant="outlined"
            />
            {!!filter && (
              <IconButton aria-label="settings" onClick={() => setFilter("")}>
                <ClearIcon />
              </IconButton>
            )}
          </Box>
          <Box display="flex">
            <Button
              className={classes.dashboardButton}
              variant="contained"
              color="primary"
              onClick={() => updateSort("firstName")}
              endIcon={
                sort.field === "firstName" ? (
                  sort.direction === "asc" ? (
                    <ArrowUpwardIcon fontSize="small" />
                  ) : (
                    <ArrowDownwardIcon fontSize="small" />
                  )
                ) : null
              }
            >
              Name
            </Button>
            <Button
              className={classes.dashboardButton}
              variant="contained"
              color="primary"
              onClick={() => updateSort("annualSalary.amount")}
              endIcon={
                sort.field === "annualSalary.amount" ? (
                  sort.direction === "asc" ? (
                    <ArrowUpwardIcon fontSize="small" />
                  ) : (
                    <ArrowDownwardIcon fontSize="small" />
                  )
                ) : null
              }
            >
              Annual Salary
            </Button>
            <Button
              className={classes.dashboardButton}
              variant="contained"
              color="primary"
              onClick={() => updateSort("startDate")}
              endIcon={
                sort.field === "startDate" ? (
                  sort.direction === "asc" ? (
                    <ArrowUpwardIcon fontSize="small" />
                  ) : (
                    <ArrowDownwardIcon fontSize="small" />
                  )
                ) : null
              }
            >
              Date
            </Button>
          </Box>
          <Box display="flex">
            <Button
              className={classes.dashboardButton}
              variant="contained"
              color="primary"
              startIcon={<CloudDownloadIcon />}
              onClick={exportToCSV}
            >
              CSV Export
            </Button>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" marginTop="20px">
          {employees.map((employee: Employee) => (
            <Card key={employee.id}>
              <CardHeader
                avatar={
                  <Avatar>{`${employee.firstName.charAt(
                    0
                  )}${employee.lastName.charAt(0)}`}</Avatar>
                }
                title={`${employee.firstName} ${employee.lastName}`}
                subheader={`Joined: ${employee.startDate} / Salary: ${employee.annualSalary.currency} ${employee.annualSalary.amount}`}
                action={
                  <>
                    <IconButton
                      onClick={() => handleExpandClick(employee.id)}
                      aria-expanded={expandedId === employee.id}
                      aria-label="show more"
                    >
                      {expandedId === employee.id ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </IconButton>
                    <IconButton
                      aria-label="settings"
                      onClick={() => removeEmployee(employee.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              />
              <Collapse
                in={expandedId === employee.id}
                timeout="auto"
                unmountOnExit
              >
                <CardContent>
                  <Box
                    display="flex"
                    flexDirection="row"
                    width="100%"
                    flexWrap="wrap"
                    justifyContent="space-evenly"
                  >
                    <Box width="30%">
                      <h2>Info</h2>
                      <Typography>{`Employee Id: ${employee.id}`}</Typography>
                      <Typography>{`Employee: ${employee.firstName} ${employee.lastName}`}</Typography>
                      <Typography>{`Joined on: ${employee.startDate}`}</Typography>
                    </Box>
                    <Box width="30%">
                      <h2>Role</h2>
                      <Typography>{`Job Title: Senior Programmer`}</Typography>
                      <Typography>{`Grade: C2`}</Typography>
                      <Typography>{`Reports to: Matthew Farrugia`}</Typography>
                    </Box>
                    <Box width="30%">
                      <h2>Salary</h2>
                      <Typography>{`Annual Salary: ${employee.annualSalary.amount}`}</Typography>
                      <Typography>{`Currency: ${employee.annualSalary.currency}`}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Collapse>
            </Card>
          ))}
        </Box>
      </Box>
      <Box
        display="flex"
        width="30%"
        justifyContent="center"
        flexDirection="row"
      >
        <EmployeeForm addEmployee={addNewEmployee} />
      </Box>
    </Box>
  );
};

export default EmployeeDashboard;
