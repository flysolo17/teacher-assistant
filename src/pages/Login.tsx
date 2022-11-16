import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  TextField,
  Box,
  Button,
  InputAdornment,
  Container,
  CircularProgress,
} from "@mui/material";
import { Email, Password } from "@mui/icons-material";
import KeyIcon from "@mui/icons-material/Key";
import SendIcon from "@mui/icons-material/Send";
import PersonAdd from "@mui/icons-material/PersonAdd";
import "../styles/login.css";
import AlertPage from "../alerts/Alert";
import { Stack } from "@mui/system";
import { auth } from "../config/config";
import { useAuth } from "../context/AuthContext";
import FIlIPINO from "../images/fil.png";
export interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event: any) => {
    event.preventDefault();
    login(email, password);
    navigate("/");
  };

  if (loading)
    return (
      <Container sx={{ width: "100%", height: "100vh" }}>
        <CircularProgress />
      </Container>
    );
  return (
    <>
      <div className="content">
        <img src={FIlIPINO} width={"80%"} height={350} />
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
              onClick={handleSubmit}
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
        </Box>
      </div>
    </>
  );
};

export default LoginPage;
