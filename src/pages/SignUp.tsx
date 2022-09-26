import React, { useState } from 'react';
import { getAuth, signOut ,createUserWithEmailAndPassword } from 'firebase/auth';
import { Stack,TextField,FormControl,FormControlLabel,RadioGroup ,FormLabel,Radio, Button} from '@mui/material';
import { doc, setDoc, getFirestore,addDoc } from 'firebase/firestore';
import '../styles/signup.css'
import { useNavigate } from 'react-router-dom';
import { type } from 'os';
export interface ISignUpProps {}


const SignUpPage : React.FunctionComponent<ISignUpProps> = (props) => {
    const auth = getAuth();
    const firestore = getFirestore();
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);
    const [firstname , setFirstname] = useState('');
    const [middleName , setMiddleName] = useState('');
    const [lastname , setLastname] = useState('');
    const [accountType,setAccountType] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleChange = (e : any) => {
        setAccountType(e.target.value);
    };
    async function signUp(firstName: string , middleName : string ,lastname : string , type : string ,email: string ,password : string) {
      setAuthing(true);
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setAuthing(false);
            const user = userCredential.user;
            saveUser(user.uid,firstName,middleName,lastname,type,email);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + " " + errorMessage);
        setAuthing(false);
      });
   }
    async function saveUser(userId: string,firstName: string , middleName : string ,lastname : string , type : string ,email: string) {
    try {
        const docRef =await setDoc(doc(firestore, "Users", userId),{
            firstName: firstName,
            middleName: middleName,
            lastName: lastname,
            type:type,
            email:email
        });
        navigate('/login');
        console.log("Document written with ID: ", docRef);
    } catch(e) {
        console.error("Error adding document: ", e);
        }
    };
    return (
        <div className='sign-up-background'>
            <Stack spacing={2} sx={{width: 400}}>
                <TextField
                    fullWidth
                    id="demo-helper-text-aligned"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    label="Firstname"/>
                <TextField
                    fullWidth
                    id="demo-helper-text-aligned"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    label="MiddleName"/>
                <TextField
                    fullWidth
                    id="demo-helper-text-aligned"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    label="Lastname"/>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">Account Type</FormLabel>
                <RadioGroup
                    row
                    defaultValue="Teacher"
                    aria-labelledby="demo--controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}>

                <FormControlLabel value="Student" control={<Radio />} label="Student" />
                <FormControlLabel value="Teacher" control={<Radio />} label="Teacher" />
                </RadioGroup>
                </FormControl>
                <TextField
                    fullWidth
                    id="demo-helper-text-aligned"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type={'email'}/>
                <TextField
                    fullWidth
                    helperText=" "
                    id="demo-helper-text-aligned-no-helper"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={'password'}/>
                <Button fullWidth variant='contained' color='success' size='large' disableElevation onClick={() =>{signUp(
                    firstname,middleName,lastname,accountType,email,password
                )}}>Sign Up</Button>
            </Stack>
        </div>
    )
}

export default SignUpPage;