import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { LinearProgress, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { userConverter, Users } from "../model/User";
import { getFirestore } from "firebase/firestore";
import TeacherHomePage from "./TeacherHome";
import StudentHomePage from "./StudentHomePage";
import { Box, display } from "@mui/system";

export interface IMainPageProps {
  user?: Users;
}

const MainPage: React.FunctionComponent<IMainPageProps> = (props) => {
  const { user } = props;
  if (user?.type == "Teacher") return <TeacherHomePage />;
  if (user?.type == "Student") return <StudentHomePage />;
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Identiftying user....</Typography>
      </Box>
    </>
  );
};

export default MainPage;
