import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup,signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { userConverter, Users } from '../model/User';
import {TextField,Box,Button, CircularProgress}from '@mui/material';
import '../styles/login.css'
export interface ILoginPageProps {

}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
    const auth = getAuth();
    const firestore = getFirestore();
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    async function identifyUser(userId : string) {
        const docRef = doc(firestore, "Users", userId).withConverter(userConverter);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const user = docSnap.data();
            if(user.type === "Teacher") {
                navigate("/");
            } else if (user.type === "Student") {
                navigate("/student");
            }
        } else {
            navigate('/*')
        }
      };

   async function signIn(email: string ,password : string) {
      setAuthing(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setAuthing(false);
        const user = userCredential.user;
        identifyUser(user.uid);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + " " + errorMessage);
        setAuthing(false);
      });
   }
    if (authing) return <div className='login-background'><CircularProgress/></div>
    return (
      <div className='login-background'>
       <Box
        sx={{
        width: 500,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& > :not(style)': { m: 1 },
      }}>
      <h1>Login</h1>
      <TextField
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="demo-helper-text-aligned"
        label="Email"
        type={'email'}
      />
      <TextField
        fullWidth
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        helperText=" "
        id="demo-helper-text-aligned-no-helper"
        label="Password"
        type={'password'}
      />
      <Button variant='contained' fullWidth size='large' disableElevation onClick={() => signIn(email,password)}>Sign In</Button>
      <Button variant='contained' fullWidth size='large' color='success' disableElevation onClick={() => {navigate("/signup")}}>Create Account</Button>
     </Box>
    </div>
    );
};

export default LoginPage;