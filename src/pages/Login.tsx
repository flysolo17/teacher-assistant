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
          <Stack sx={{ width: 700 }} direction={"column"}>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 700,

                fontStyle: "normal",
                fontSize: 26,
              }}
            >
              Overview
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 400,
                textAlign: "justify",
                fontStyle: "normal",
                fontSize: 20,
              }}
            >
              Ang Kompyuter Asisted Instraksyon sa Asignaturang Filipino para sa
              Ikapitong Baitang ay idenesinyo upang pagtibayin at pagyamanin ang
              mga kasanayan sa pagaaral ng mga mag-aaral. Ang pag-aaral sa ating
              Asignaturang Filipino nang buo at integratibo na nagmumula sa
              pagbabasa, pag-aaral ng aralin at pagsusulit. Bahagi nito ang mga
              tanong na nangangalangan ng ibayong kasagutan na bibigyang diin ng
              bawat aralin sa Asignaturang Filipino para sa Ikapitong Baitang.
              Madaragdagan pa ang lubos mong pagkakatuto dahil sa iba’t ibang
              uri ng talakayan o uri ng panatikan na iyong matutunghayan sa
              bawat aralin. Kabahagi pa nito ang ilang pagsasanay sa bawat
              tanong ng aralin at sa iyong pag-unawa sa pagbasa. At ang marka o
              grado sa bawat assignatura ay nasusubaybayan ng iyong guro upang
              maging epektibo ang iyong napag-aralan.
            </Typography>
          </Stack>
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
                Mag Sign In
              </Button>
              <ForgotPassword/>
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
