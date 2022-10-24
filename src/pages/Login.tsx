import React, { useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { userConverter, Users } from "../model/User";
import {
  TextField,
  Box,
  Button,
  InputAdornment,
  LinearProgress,
} from "@mui/material";
import { Email, Password } from "@mui/icons-material";
import KeyIcon from "@mui/icons-material/Key";
import SendIcon from "@mui/icons-material/Send";
import PersonAdd from "@mui/icons-material/PersonAdd";
import "../styles/login.css";
import AlertPage from "../alerts/Alert";
import { Stack } from "@mui/system";
import { auth } from "../config/config";
export interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const firestore = getFirestore();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });
  async function identifyUser(userId: string) {
    const docRef = doc(firestore, "Users", userId).withConverter(userConverter);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const user = docSnap.data();
      if (user.type === "Teacher") {
        navigate("/");
      } else if (user.type === "Student") {
        navigate("/student");
      }
    } else {
      navigate("/*");
    }
  }

  async function signIn(email: string, password: string) {
    setAuthing(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthing(false);
        const user = userCredential.user;
        navigate("/");
        setOpen({ open: true, message: "User Signed in!" });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + " " + errorMessage);
        setAuthing(false);
        setOpen({ open: true, message: errorCode + " " + errorMessage });
      });
  }
  return (
    <>
      <div className="content">
        <img src="images/hero.png" width={"80%"} height={350} />
        <Box sx={{ width: 500, backgroundColor: "#fff", margin: 2 }}>
          <Stack
            direction={"column"}
            spacing={2}
            sx={{ paddingY: 10, paddingX: 5 }}
          >
            <p className="note">Please sign in to access the system</p>
            <TextField
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="demo-helper-text-aligned"
              label="Email"
              size="small"
              type={"email"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText=" "
              size="small"
              id="demo-helper-text-aligned-no-helper"
              label="Password"
              type={"password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Password />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant={"contained"}
              fullWidth
              disableElevation
              startIcon={<SendIcon />}
              onClick={() => signIn(email, password)}
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              fullWidth
              disableElevation
              color="error"
              startIcon={<KeyIcon />}
            >
              Forgot Password
            </Button>
            <Button
              variant="contained"
              fullWidth
              color="success"
              disableElevation
              startIcon={<PersonAdd />}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Create Account
            </Button>
          </Stack>
          {authing && <LinearProgress />}
        </Box>
      </div>

      <AlertPage message={open.message} open={open.open} />
    </>
  );
};

export default LoginPage;
