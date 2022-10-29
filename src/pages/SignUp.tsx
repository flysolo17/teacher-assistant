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
import "../styles/signup.css";
import { useAuth } from "../context/AuthContext";
export interface ISignUpProps {}

interface TUser {}
const SignUpPage: React.FunctionComponent<ISignUpProps> = (props) => {

  const navigate = useNavigate();
  const { signup, loading } = useAuth();
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<Users>({
    id: "",
    firstName: "",
    middleName: "",
    lastName: "",
    type: "",
    email: "",
    profile: [],
  });

  const handdleSubmit = (event: any) => {
    event.preventDefault();
    signup(user.email, password, user);
    navigate("/");
  };

  if (loading)
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
          value={user.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
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
          value={user.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={"password"}
        />
        <Button
          fullWidth
          variant="contained"
          color="success"
          size="large"
          disableElevation
          onClick={handdleSubmit}
        >
          Sign Up
        </Button>
        <Button onClick={() => navigate("/login")}>
          Already Have an Account? Sign In
        </Button>
      </Stack>
    </Box>
  );
};

export default SignUpPage;
