import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  TextField,
  Box,
  Button,
  InputAdornment,
  Container,
  CircularProgress,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import {
  Email,
  Password,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import KeyIcon from "@mui/icons-material/Key";
import SendIcon from "@mui/icons-material/Send";
import PersonAdd from "@mui/icons-material/PersonAdd";
import "../styles/login.css";
import AlertPage from "../alerts/Alert";
import { Stack } from "@mui/system";
import { auth } from "../config/config";
import { useAuth } from "../context/AuthContext";
import FIlIPINO from "../images/fil.png";
import ForgotPassword from "../components/ForgotPassword";

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
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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
        <Stack direction={"row"} spacing={8}>
          <Box sx={{ width: 500, backgroundColor: "#fff", margin: 2 }}>
            <Stack
              direction={"column"}
              spacing={2}
              sx={{ paddingY: 10, paddingX: 5 }}
            >
              <p className="note">Mag Sign in para maaccess ang system</p>
              <TextField
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="demo-helper-text-aligned"
                label="Email"
                type={"email"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />

              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button
                variant={"contained"}
                fullWidth
                disableElevation
                startIcon={<SendIcon />}
                onClick={handleSubmit}
              >
                Mag Sign In
              </Button>
              <ForgotPassword />
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
                Lumikha ng account
              </Button>
            </Stack>
          </Box>
        </Stack>
      </div>
    </>
  );
};

export default LoginPage;
