import React, { useState, useEffect } from "react";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  Stack,
  TextField,
  FormControl,
  CircularProgress,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
  Button,
  Box,
} from "@mui/material";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import "../styles/signup.css";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { Users } from "../model/User";
import AlertPage from "../alerts/Alert";
import { padding } from "@mui/system";
import "../styles/signup.css";
export interface ISignUpProps {}

interface TUser {
  firstname: string;
  middleName: string;
  lastname: string;
  type: string;
  email: string;
  password: string;
  alert: {
    open: boolean;
    message: string;
  };
}
const SignUpPage: React.FunctionComponent<ISignUpProps> = (props) => {
  const auth = getAuth();
  const firestore = getFirestore();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const [user, setUser] = useState<TUser>({
    firstname: "",
    middleName: "",
    lastname: "",
    type: "Teacher",
    email: "",
    password: "",
    alert: {
      open: false,
      message: "",
    },
  });

  async function signUp() {
    setAuthing(true);
    await createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        setAuthing(false);
        const currenUser = userCredential.user;
        let newUser: Users = {
          id: currenUser.uid,
          firstName: user.firstname,
          middleName: user.middleName,
          lastName: user.lastname,
          type: user.type,
          email: user.email,
          profile: "",
        };
        saveUser(newUser);
      })
      .catch((error) => {
        setAuthing(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        setUser({
          ...user,
          alert: {
            open: true,
            message: errorCode + " " + errorMessage,
          },
        });
      });
    setAuthing(false);
  }
  async function saveUser(users: Users) {
    setAuthing(true);
    try {
      await setDoc(doc(firestore, "Users", users.id), users);
      setUser({
        ...user,
        alert: {
          open: true,
          message: "Successfully created",
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setAuthing(false);
    setUser({
      ...user,
      alert: {
        open: true,
        message: "Error adding document..",
      },
    });
  }

  if (authing)
    return (
      <div className="login-background">
        <CircularProgress />
      </div>
    );

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f2f4f7",
      }}
    >
      <Stack
        spacing={2}
        sx={{ width: 400, backgroundColor: "white", padding: 5 }}
      >
        <p className="title">Sign Up</p>
        <TextField
          fullWidth
          id="demo-helper-text-aligned"
          value={user.firstname}
          onChange={(e) => setUser({ ...user, firstname: e.target.value })}
          label="Firstname"
        />
        <TextField
          fullWidth
          id="demo-helper-text-aligned"
          value={user.middleName}
          onChange={(e) => setUser({ ...user, middleName: e.target.value })}
          label="MiddleName"
        />
        <TextField
          fullWidth
          id="demo-helper-text-aligned"
          value={user.lastname}
          onChange={(e) => setUser({ ...user, lastname: e.target.value })}
          label="Lastname"
        />
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Account Type
          </FormLabel>
          <RadioGroup
            row
            defaultValue="Teacher"
            aria-labelledby="demo--controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={user.type}
            onChange={(e) => setUser({ ...user, type: e.target.value })}
          >
            <FormControlLabel
              value="Student"
              control={<Radio />}
              label="Student"
            />
            <FormControlLabel
              value="Teacher"
              control={<Radio />}
              label="Teacher"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          fullWidth
          id="demo-helper-text-aligned"
          label="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          type={"email"}
        />
        <TextField
          fullWidth
          helperText=" "
          id="demo-helper-text-aligned-no-helper"
          label="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type={"password"}
        />
        <Button
          fullWidth
          variant="contained"
          color="success"
          size="large"
          disableElevation
          onClick={() => signUp()}
        >
          Sign Up
        </Button>
        <Button onClick={() => navigate("/login")}>
          Already Have an Account? Sign In
        </Button>
      </Stack>
      <AlertPage message={user.alert.message} open={user.alert.open} />
    </Box>
  );
};

export default SignUpPage;
