import { Box, Button, TextField } from "@material-ui/core";
import { Formik } from "formik";
import { Employee } from "../models/employee";

interface EmployeeFormProps {
  addEmployee(employee: Employee): void;
}

const EmployeeForm = (props: EmployeeFormProps): JSX.Element => {
  console.log(props);

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        id: "",
        startDate: "",
        currency: "",
        amount: "",
      }}
      onSubmit={async (values: any, { setSubmitting }: any) => {
        //This is only for test purposes , the best way to do this is to check if the id exisits already and throw an error if so
        const userId = Math.floor(Math.random() * 100000) + 1;

        let employeeModel: Employee = {
          id: userId,
          firstName: values.firsName,
          lastName: values.lastName,
          startDate: values.startDate,
          annualSalary: {
            amount: values.amount,
            currency: values.currency,
          },
        };

        props.addEmployee(employeeModel);
      }}
    >
      {({ handleSubmit, values, handleChange }) => (
        <>
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              padding="30px"
              height="500px"
              maxWidth="20%"
              justifyContent="space-evenly"
            >
              <TextField
                label="First Name"
                variant="outlined"
                name="firstName"
                type="text"
                value={values.firstName}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                name="lastName"
                type="text"
                value={values.lastName}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <TextField
                label="Annual Salary"
                variant="outlined"
                name="amount"
                type="text"
                value={values.amount}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <TextField
                label="Currency"
                variant="outlined"
                name="currency"
                type="text"
                value={values.currency}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <TextField
                label="Start Date"
                variant="outlined"
                name="startDate"
                type="text"
                value={values.startDate}
                onChange={(e) => {
                  handleChange(e);
                }}
              />

              <Button variant="contained" size="medium" type="submit">
                Add employee
              </Button>
            </Box>
          </form>
        </>
      )}
    </Formik>
  );
};

export default EmployeeForm;
