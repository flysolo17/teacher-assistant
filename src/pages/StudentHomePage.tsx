import { Container } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export interface IStudentHomePageProps {}

const StudentHomePage: React.FunctionComponent<IStudentHomePageProps> = (
  props
) => {
  const auth = getAuth();
  const navigate = useNavigate();
  return (
    <Container
      sx={{ width: "100%", height: "100vh", backgroundColor: "black" }}
    ></Container>
  );
};

export default StudentHomePage;
