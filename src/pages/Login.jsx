import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import UserPool from '../utils/awsExports';
Amplify.configure(UserPool);

export default function Login() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

// import { useState } from 'react'
// import { Button, TextField,Typography } from '@mui/material'
// import { useNavigate } from 'react-router-dom';
// import { authenticate } from '../services/aws-cognito-service';
// // import UserPool from '../utils/awsExports';

// const Login = () => {
//   const Navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailErr, setEmailErr] = useState('');
//   const [passwordErr, setPasswordErr] = useState('');
//   const [loginErr,setLoginErr]=useState('');

//   const formInputChange = (formField, value) => {
//     if (formField === "email") {
//       setEmail(value);
//     }
//     if (formField === "password") {
//       setPassword(value);
//     }
//   };

//   const validation = () => {
//     // eslint-disable-next-line no-unused-vars
//     return new Promise((resolve, reject) => {
//       if (email === '' && password === '') {
//         setEmailErr("Email is Required");
//         setPasswordErr("Password is required")
//         resolve({ email: "Email is Required", password: "Password is required" });
//       }
//       else if (email === '') {
//         setEmailErr("Email is Required")
//         resolve({ email: "Email is Required", password: "" });
//       }
//       else if (password === '') {
//         setPasswordErr("Password is required")
//         resolve({ email: "", password: "Password is required" });
//       }
//       else if (password.length < 6) {
//         setPasswordErr("must be 6 character")
//         resolve({ email: "", password: "must be 6 character" });
//       }
//       else {
//         resolve({ email: "", password: "" });
//       }
//     });
//   };

//   const handleClick = () => {
//     setEmailErr("");
//     setPasswordErr("");
//     validation()
//       .then((res) => {
//         if (res.email === '' && res.password === '') {
//           authenticate(email,password)
//           // eslint-disable-next-line no-unused-vars
//           .then((_data)=>{
//             setLoginErr('');
//             Navigate('/dashboard');
//           },(err)=>{
//             console.log(err);
//             setLoginErr(err.message)
//           })
//           .catch(err=>console.log(err))
//         }
//       }, err => console.log(err))
//       .catch(err => console.log(err));
//   }

//   return (
//     <div className="login">

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
//           <Button type='submit' variant='contained' onClick={handleClick}>Login</Button>
//         </div>
//         <Typography variant="body">{loginErr}</Typography>
//       </div>

//     </div>
//   )
// }

// export default Login