import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();
export default function SignUp() {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const attributeList = [];
            attributeList.push(
              new CognitoUserAttribute({
                Name: 'email',
                Value: data.get('email'),
              })
            );
    UserPool.signUp(data.get('email'), data.get('password'), attributeList, null, (err, data) => {
      if (err) {
        console.log(err);
        alert("Couldn't sign up");
      } else {
        console.log(data);
        alert('User Added Successfully');
        navigate('/dashboard');
      }
    });
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  //   const handleClick = () => {
  //     setEmailErr("");
  //     setPasswordErr("");
  //     validation()
  //       .then((res) => {
  //         if (res.email === '' && res.password === '') {
  //           const attributeList = [];
  //           attributeList.push(
  //             new CognitoUserAttribute({
  //               Name: 'email',
  //               Value: email,
  //             })
  //           );
  //           let username=email;
  //           UserPool.signUp(username, password, attributeList, null, (err, data) => {
  //             if (err) {
  //               console.log(err);
  //               alert("Couldn't sign up");
  //             } else {
  //               console.log(data);
  //               alert('User Added Successfully');
  //               Navigate('/dashboard');
  //             }
  //           });
  //         }
  //       }, err => console.log(err))
  //       .catch(err => console.log(err));
  //   }

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
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
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

import UserPool from '../../utils/awsExports';
import {  useNavigate } from 'react-router-dom';

// import { Button, TextField} from '@mui/material'
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import {CognitoUserAttribute } from 'amazon-cognito-identity-js';
// import UserPool from '../utils/awsExports';

// const SignUp = () => {
//   const Navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailErr, setEmailErr] = useState('');
//   const [passwordErr, setPasswordErr] = useState('');

//   const formInputChange = (formField, value) => {
//     if (formField === "email") {
//       setEmail(value);
//     }
//     if (formField === "password") {
//       setPassword(value);
//     }
//   };

//   const validation = () => {
//     return new Promise((resolve,reject)=>{
//       if (email === '' && password === '') {
//         setEmailErr("Email is Required");
//         setPasswordErr("Password is required")
//         resolve({email:"Email is Required",password:"Password is required"});
//       }
//       else if (email === '') {
//         setEmailErr("Email is Required")
//         resolve({email:"Email is Required",password:""});
//       }
//       else if (password === '') {
//         setPasswordErr("Password is required")
//         resolve({email:"",password:"Password is required"});
//       }
//       else if (password.length < 6) {
//         setPasswordErr("must be 6 character")
//         resolve({email:"",password:"must be 6 character"});
//       }
//       else{
//         resolve({email:"",password:""});
//       }
//       reject('')
//     });
//   };

//   const handleClick = () => {
//     setEmailErr("");
//     setPasswordErr("");
//     validation()
//       .then((res) => {
//         if (res.email === '' && res.password === '') {
//           const attributeList = [];
//           attributeList.push(
//             new CognitoUserAttribute({
//               Name: 'email',
//               Value: email,
//             })
//           );
//           let username=email;
//           UserPool.signUp(username, password, attributeList, null, (err, data) => {
//             if (err) {
//               console.log(err);
//               alert("Couldn't sign up");
//             } else {
//               console.log(data);
//               alert('User Added Successfully');
//               Navigate('/dashboard');
//             }
//           });
//         }
//       }, err => console.log(err))
//       .catch(err => console.log(err));
//   }

//   return (
//     <div className="signup">

//       <div className='form'>
//         <div className="formfield">
//           <TextField
//             value={email}
//             onChange={(e) => formInputChange("email", e.target.value)}
//             label="Email"
//             helperText={emailErr}
//           />
//         </div>
//         <div className='formfield'>
//           <TextField
//             value={password}
//             onChange={(e) => { formInputChange("password", e.target.value) }}
//             type="password"
//             label="Password"
//             helperText={passwordErr}
//           />
//         </div>
//         <div className='formfield'>
//           <Button type='submit' variant='contained' onClick={handleClick}>Signup</Button>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default SignUp
