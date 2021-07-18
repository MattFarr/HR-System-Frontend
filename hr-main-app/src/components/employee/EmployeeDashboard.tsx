/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { Employee } from "../../models/employee/employee";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { employeeActionCreators, State } from "../../state";
import EmployeeForm from "./EmployeeForm";
import ClearIcon from "@material-ui/icons/Clear";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { ISort } from "../../models/sort/ISort";
import { sortList } from "../../helpers/sort/sortHelper";
import { filterEmployeeByName } from "../../helpers/filter/filterHelper";
import { exportEmployeesToCSV } from "../../helpers/csv/csvExportHelper";
import SortButton from "../common/SortButton";
import EmployeeDetails from "./EmployeeDetails";

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
  const [filter, setFilter] = useState<string>("");
  const [sort, setSort] = useState<ISort>({
    field: "",
    direction: "asc",
  });

  const addNewEmployee = (employee: Employee) => {
    setFilter("");
    addEmployee(employee);
  };

  useEffect(() => {
    let list = employeesState.employees;
    list = filterEmployeeByName(list, filter) ?? employeesState.employees;
    list = sortList<Employee>(list, sort);
    setEmployees(list);
  }, [filter, sort, employeesState]);

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
          <Box display="flex" minWidth="280px">
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
            <SortButton
              label={"Name"}
              field="firstName"
              sortObject={sort}
              setSort={setSort}
            />
            <SortButton
              label={"Annual Salary"}
              field="annualSalary.amount"
              sortObject={sort}
              setSort={setSort}
            />
            <SortButton
              label={"Start Date"}
              field="startDate"
              sortObject={sort}
              setSort={setSort}
            />
          </Box>
          <Box display="flex">
            <Button
              className={classes.dashboardButton}
              variant="contained"
              color="primary"
              startIcon={<CloudDownloadIcon />}
              onClick={() => exportEmployeesToCSV(employees)}
            >
              <Typography variant="body2">CSV Export</Typography>
            </Button>
          </Box>
        </Box>
        <EmployeeDetails
          employees={employees}
          removeEmployee={removeEmployee}
        />
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
