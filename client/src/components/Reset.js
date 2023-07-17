import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from "formik";
import { FormControl } from '@mui/material';
import { SchemaResetPasswordValidation } from '../helper/Validate';
const theme = createTheme();


export default function Reset() {

    const formik = useFormik({
        initialValues: {
          password: "",
          repeatpassword:''
        },
        validationSchema: SchemaResetPasswordValidation,
        onSubmit: (values) => {
          alert(JSON.stringify(values, null, 2));
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
              Reset  Password
            </Typography>
            <div style={{ fontSize: 'small', fontWeight: 300,paddingTop:4 }}>
              Enter new password
            </div>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 5 }}>
              
            <Grid container>
              <Grid item xs={12} py={2}>
                <FormControl style={{ width: '100%'}} >
                    <TextField
                        fullWidth
                        label="new password"
                        type="password"
                        {...formik.getFieldProps("password")}
                        
                    />
                    {formik.touched.password && formik.errors.password ? (
                            <div className='text-error'>{formik.errors.password}</div>
                        ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12} py={2}>
                <FormControl style={{ width: '100%'}} >
                    <TextField
                        fullWidth
                        label="repeat password"
                        type="password"
                        {...formik.getFieldProps("repeatpassword")}
                        
                    />
                    {formik.touched.repeatpassword && formik.errors.repeatpassword ? (
                            <div className='text-error'>{formik.errors.repeatpassword}</div>
                        ) : null}
                </FormControl>
              </Grid>
            </Grid>  
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}