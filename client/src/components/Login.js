import * as React from 'react';
import {SchemaLoginValidation} from '../helper/Validate';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from "formik";
import { FormControl } from '@mui/material';
import { Link,useNavigate } from "react-router-dom";
import http,{ appConfigApi } from '../appConfig';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const theme = createTheme();

export default function Login() {
  const toastId = React.useRef(null);
  const navigate=useNavigate();
  
    const formik = useFormik({
        initialValues: {
          email: "",
          password:""
        },
        validationSchema: SchemaLoginValidation,
        onSubmit: (values) => {
          axios.post(appConfigApi.login,{
        
          //will set cookie from any domain while credentials:'same-origin' will only set cookie from the same domain as the client.
          body: values})
          .then(res => res.json())
          .then(data => {
            if(data.message){
              toast.success(data)
              navigate('/profile')
              formik.resetForm();
            }
          })
          .catch(error => {
            console.log(error)
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
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
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
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
              
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs mx={2}>
                  <Link to="/forgot" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item mx={2}>
                  <Link to="/register" variant="body2">
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}