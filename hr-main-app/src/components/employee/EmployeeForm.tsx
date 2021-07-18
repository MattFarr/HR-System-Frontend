import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import * as Yup from "yup";
import { Formik } from "formik";
import { Employee } from "../../models/employee/employee";

interface EmployeeFormProps {
  addEmployee: (employee: Employee) => void;
}

const FormSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Numbers and Special Characters are not supported")
    .required("Required"),
  lastName: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Numbers and Special Characters are not supported")
    .required("Required"),
  amount: Yup.number()
    .positive("Must be greater than zero")
    .required("Required"),
  startDate: Yup.date().required("Required"),
});

const EmployeeForm = (props: EmployeeFormProps): JSX.Element => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        id: "",
        startDate: "",
        currency: "EUR",
        amount: "",
      }}
      validationSchema={FormSchema}
      onSubmit={async (values: any) => {
        /*This is only for sole purpose of this test, usually backend handles this
        And also you need to do a check if the id exisits already and throw an error if so both client and server side*/
        const userId = Math.floor(Math.random() * 100000) + 1;

        let employeeModel: Employee = {
          id: userId,
          firstName: values.firstName,
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
      {({
        handleSubmit,
        values,
        handleChange,
        errors,
        touched,
        setFieldTouched,
      }) => (
        <Box width="100%" padding="20px">
          <Typography variant="h1">New Employee</Typography>
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              height="500px"
              justifyContent="space-evenly"
              padding="0 30px"
              marginTop="30px"
              borderRadius="20px"
              border="1px solid #003366"
            >
              <TextField
                id="firstName"
                fullWidth={true}
                label="First Name"
                variant="outlined"
                name="firstName"
                type="text"
                value={values.firstName}
                onChange={(e) => {
                  setFieldTouched(e.target.name, true, false);
                  handleChange(e);
                }}
                error={touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
              />
              <TextField
                id="lastName"
                label="Last Name"
                variant="outlined"
                name="lastName"
                type="text"
                value={values.lastName}
                onChange={(e) => {
                  setFieldTouched(e.target.name, true, false);
                  handleChange(e);
                }}
                error={touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
              />
              <TextField
                id="amount"
                label="Annual Salary"
                variant="outlined"
                name="amount"
                type="text"
                value={values.amount}
                onChange={(e) => {
                  setFieldTouched(e.target.name, true, false);
                  handleChange(e);
                }}
                error={touched.amount && !!errors.amount}
                helperText={touched.amount && errors.amount}
              />
              <RadioGroup
                id="currency"
                row
                name="currency"
                onChange={(e) => {
                  setFieldTouched(e.target.name, true, false);
                  handleChange(e);
                }}
                value={values.currency}
              >
                <FormControlLabel
                  value="EUR"
                  control={<Radio color="primary" />}
                  label="EUR"
                />
                <FormControlLabel
                  value="USD"
                  control={<Radio color="primary" />}
                  label="USD"
                />
              </RadioGroup>
              <TextField
                id="startDate"
                label="Start Date"
                variant="outlined"
                name="startDate"
                type="date"
                contentEditable={false}
                InputLabelProps={{
                  shrink: true,
                }}
                value={values.startDate}
                onChange={(e) => {
                  setFieldTouched(e.target.name, true, false);
                  handleChange(e);
                }}
                error={touched.startDate && !!errors.startDate}
                helperText={touched.startDate && errors.startDate}
              />

              <Button
                variant="contained"
                color="primary"
                size="medium"
                type="submit"
              >
                Add employee
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </Formik>
  );
};

export default EmployeeForm;
