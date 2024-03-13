import React, { useState } from 'react';
import { Box, Typography, Button, Grid, FormControl } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthRegister = ({ title, subtitle, subtext }) => {
  const BaseUrl = 'http://127.0.0.1:8000';
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userdata, setuserdata] = useState({
    is_superuser: false,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setuserdata({ ...userdata, [id]: value });
  };

  const setconfirm_password = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userdata.password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
      setuserdata({});
      return;
    } else {
      try {
        const response = await axios.post(`${BaseUrl}/doc/createUser/`, userdata);
        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            title: 'Success!',
            text: 'Registration Succesfull!',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            window.location.href = '/dashboard';
          });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}
      <FormControl>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="name"
                mb="5px"
              >
                Name
              </Typography>
              <CustomTextField id="name" variant="outlined" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="email"
                mb="5px"
                mt="25px"
              >
                Email Address
              </Typography>
              <CustomTextField id="email" variant="outlined" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="age"
                mb="5px"
              >
                Age
              </Typography>
              <CustomTextField id="age" variant="outlined" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="major"
                mb="5px"
              >
                Major
              </Typography>
              <CustomTextField id="major" variant="outlined" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="about"
                mb="5px"
              >
                About
              </Typography>
              <CustomTextField id="about" variant="outlined" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="dob"
                mb="5px"
              >
                Date of Birth
              </Typography>
              <CustomTextField
                type="datetime-local"
                id="dob"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="role"
                mb="5px"
              >
                Role
              </Typography>
              <CustomTextField id="role" variant="outlined" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="file"
                mb="5px"
              >
                Role File
              </Typography>
              <CustomTextField
                type="file"
                id="file"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="password"
                mb="5px"
              >
                Password
              </Typography>
              <CustomTextField
                type="password"
                id="password"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="confirmPassword"
                mb="5px"
              >
                Confirm Password
              </Typography>
              <CustomTextField
                type="password"
                id="confirmPassword"
                variant="outlined"
                fullWidth
                onChange={setconfirm_password}
              />
            </Grid>
          </Grid>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            component={Link}
            to="/auth/login"
          >
            Sign Up
          </Button>
        </Box>
      </FormControl>
      {subtitle}
    </>
  );
};

export default AuthRegister;
