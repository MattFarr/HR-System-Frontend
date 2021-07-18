import {
  Box,
  Button,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import * as Yup from "yup";
import { Formik } from "formik";
import { Employee } from "../../models/employee/employee";
import AddIcon from "@material-ui/icons/Add";

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
  title: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Numbers and Special Characters are not supported")
    .required("Required"),
  manager: Yup.string()
    .matches(
      /^[a-zA-Z\s]*$/,
      "Numbers and Special Characters are not supported"
    )
    .required("Required"),
  grade: Yup.string().required("Required"),
  amount: Yup.string()
    .matches(/^[0-9]*$/, "Only numbers are allwoed")
    .required("Required")
    .test(
      "len",
      "Salary must be exactly 5 digits",
      (amount) => amount?.length === 5
    ),
  startDate: Yup.date().required("Required"),
});

const useStyles = makeStyles(() => ({
  newEmployeeHeading: {
    paddingLeft: "30px",
  },
}));

const EmployeeForm = (props: EmployeeFormProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        id: "",
        title: "",
        grade: "",
        manager: "",
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
          title: values.title,
          grade: values.grade,
          manager: values.manager,
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
          <Typography variant="h1" className={classes.newEmployeeHeading}>
            New Employee
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              height="680px"
              justifyContent="space-evenly"
              padding="0 30px"
              marginTop="10px"
              borderLeft="3px solid grey"
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
                id="title"
                label="Job Title"
                variant="outlined"
                name="title"
                type="text"
                value={values.title}
                onChange={(e) => {
                  setFieldTouched(e.target.name, true, false);
                  handleChange(e);
                }}
                error={touched.title && !!errors.title}
                helperText={touched.title && errors.title}
              />
              <TextField
                id="grade"
                label="Job Grade"
                variant="outlined"
                name="grade"
                type="text"
                value={values.grade}
                onChange={(e) => {
                  setFieldTouched(e.target.name, true, false);
                  handleChange(e);
                }}
                error={touched.grade && !!errors.grade}
                helperText={touched.grade && errors.grade}
              />
              <TextField
                id="manager"
                label="Reports To"
                variant="outlined"
                name="manager"
                type="text"
                value={values.manager}
                onChange={(e) => {
                  setFieldTouched(e.target.name, true, false);
                  handleChange(e);
                }}
                error={touched.manager && !!errors.manager}
                helperText={touched.manager && errors.manager}
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
                endIcon={<AddIcon />}
              >
                <Typography variant="body1">New Employee</Typography>
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </Formik>
  );
};

export default EmployeeForm;
