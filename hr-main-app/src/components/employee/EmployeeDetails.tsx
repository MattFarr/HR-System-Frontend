import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { Employee } from "../../models/employee/employee";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

interface EmployeeDetailsProps {
  employees: Employee[];
  removeEmployee: (id: number) => void;
}

const useStyles = makeStyles(() => ({
  detailHeading: {
    fontWeight: 600,
    marginBottom: "20px",
  },
}));

const EmployeeDetails = (props: EmployeeDetailsProps): JSX.Element => {
  const classes = useStyles();
  const { employees, removeEmployee } = props;

  const [expandedId, setExpandedId] = useState(-1);

  const handleExpandClick = (i: number) => {
    setExpandedId(expandedId === i ? -1 : i);
  };

  return (
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
                  <Typography variant="h2" className={classes.detailHeading}>
                    Info
                  </Typography>
                  <Typography>{`Employee Id: ${employee.id}`}</Typography>
                  <Typography>{`Employee: ${employee.firstName} ${employee.lastName}`}</Typography>
                  <Typography>{`Joined on: ${employee.startDate}`}</Typography>
                </Box>
                <Box width="30%">
                  <Typography variant="h2" className={classes.detailHeading}>
                    Role
                  </Typography>
                  <Typography>{`Job Title: Senior Programmer`}</Typography>
                  <Typography>{`Grade: C2`}</Typography>
                  <Typography>{`Reports to: Matthew Farrugia`}</Typography>
                </Box>
                <Box width="30%">
                  <Typography variant="h2" className={classes.detailHeading}>
                    Salary
                  </Typography>
                  <Typography>{`Annual Salary: ${employee.annualSalary.amount}`}</Typography>
                  <Typography>{`Currency: ${employee.annualSalary.currency}`}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </Box>
  );
};

export default EmployeeDetails;
