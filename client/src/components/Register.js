import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useFormik } from "formik";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormControl } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {SchemaRegisterValidation} from "../helper/Validate"
import { Link, useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import http,{ appConfigApi } from '../appConfig';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const theme = createTheme();

export default function Register() {
  const [gender, setGender] = React.useState('');
  const navigate=useNavigate();
  const toastId = React.useRef(null);
  const handleGender = (event) => {
    setGender(event.target.value);
  };
  
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName:"",
      email:'',
      gender:'',
      password:'',
      confirmPassword:'',
      acceptConditions:false
    },
   

    validationSchema: SchemaRegisterValidation,
    onSubmit: (values,{ resetForm }) => {
      const {confirmPassword,...user}=values; // confirm password don't want to save in db 
      http.post(appConfigApi.register,user)
      .then(response => {
        console.log(response)
        navigate('/profile')
        toast.success(response.data.message)
        formik.resetForm();
      })
      .catch(error => {
        if(error.response){
          // to prevent duplicate toast
          if(! toast.isActive(toastId.current)) {
            toastId.current = toast.error(error.response.data.error);
          }
        }
      })
    }
  });
  

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} py={2}>
              <FormControl style={{width:'100%'}}>
                    <TextField
                        fullWidth
                        label="First Name"
                        type="text"
                        {...formik.getFieldProps("firstName")}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                            <div className='text-error'>{formik.errors.firstName}</div>
                        ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} py={2}>
              <FormControl style={{width:'100%'}}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        type="text"
                        {...formik.getFieldProps("lastName")}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                            <div className='text-error'>{formik.errors.lastName}</div>
                        ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12} py={2}>
              <FormControl style={{ width: '100%'}} >
                    <TextField
                        fullWidth
                        label="Email Address"
                        autoComplete="email"
                        {...formik.getFieldProps("email")}
                        
                    />
                    {formik.touched.email && formik.errors.email ? (
                            <div className='text-error'>{formik.errors.email}</div>
                        ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12} py={2}>
              <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          label="Gender"
          onChange={handleGender}
          {...formik.getFieldProps("gender")}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>
        {formik.touched.gender && formik.errors.gender ? (
          <div className='text-error'>{formik.errors.gender}</div>
          ) : null}
      </FormControl>
              </Grid>
              <Grid item xs={12} py={2}>
              <FormControl style={{width:'100%'}}>
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        
                        {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password ? (
                            <div className='text-error'>{formik.errors.password}</div>
                        ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12} py={2}>
              <FormControl style={{width:'100%'}}>
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        autoComplete="confirm-password"
                        
                        {...formik.getFieldProps("confirmPassword")}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <div className='text-error'>{formik.errors.confirmPassword}</div>
                        ) : null}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={formik.values.acceptConditions} {...formik.getFieldProps("acceptConditions")}  color="primary" />}
                  label="I Accept all the terms and condition"
                />
                {formik.touched.acceptConditions && formik.errors.acceptConditions ? (
                            <div className='text-error'>{formik.errors.acceptConditions}</div>
                        ) : null}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              //toastStyle={{ backgroundColor: "crimson",color:'white' }}
              //theme="colored"
              />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      
      </Container>
    </ThemeProvider>
  );
}