import React from "react";
import { Box, Button, TextField, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  address: "",
  username: "",
  password: "",
  gender: "male",
  dateOfBirth: null,
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const userSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  gender: yup.string().oneOf(["male", "female", "other"], "Invalid gender").required("Gender is required"),
  dateOfBirth: yup.date().nullable().required("Date of birth is required"),
});

export default function Form() {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dbPort = "http://localhost:5001";

  const handleFormSubmit = (values) => {
    fetch(`${dbPort}/api/patient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        dateOfBirth: values.dateOfBirth.toISOString(),
        gender: values.gender,
        address: values.address,
        phoneNumber: values.phoneNumber,
      }),
    }).then((res) => res.json());
    navigate("/home");
  };

  return (
    <Box m="20px">
      <Header title={"Create a new User"} />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap={"30px"}
              gridTemplateColumns={"repeat(4, minmax(0, 1fr))"}
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!errors.firstName && touched.firstName}
                helperText={errors.firstName && touched.firstName && errors.firstName}
                />
                        <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Last Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.lastName}
            name="lastName"
            error={!!errors.lastName && touched.lastName}
            helperText={errors.lastName && touched.lastName && errors.lastName}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            name="email"
            error={!!errors.email && touched.email}
            helperText={errors.email && touched.email && errors.email}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Phone Number"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.phoneNumber}
            name="phoneNumber"
            error={!!errors.phoneNumber && touched.phoneNumber}
            helperText={errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Address"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.address}
            name="address"
            error={!!errors.address && touched.address}
            helperText={errors.address && touched.address && errors.address}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Username"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.username}
            name="username"
            error={!!errors.username && touched.username}
            helperText={errors.username && touched.username && errors.username}
          />

          <TextField
            fullWidth
            variant="filled"
            type="password"
            label="Password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            name="password"
            error={!!errors.password && touched.password}
            helperText={errors.password && touched.password && errors.password}
          />
          <input type="date" />
          {/* <DatePicker
            label="Date of Birth"
            name="dateOfBirth"
            onChange={(date) => setFieldValue("dateOfBirth", date)}
            selected={values.dateOfBirth}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            dateFormat="dd/MM/yyyy"
            onBlur={() => setFieldValue("dateOfBirth", values.dateOfBirth)}
            error={!!errors.dateOfBirth && touched.dateOfBirth}
          /> */}

          <RadioGroup
            row
            name="gender"
            value={values.gender}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>

          <Button
            type="submit"
            variant="contained"
            sx={{
              gridColumn: isNonMobile ? "span 2" : "span 4",
              justifySelf: "center",
            }}
          >
            Create
          </Button>
        </Box>
      </form>
    )}
  </Formik>
</Box>
  );
          }