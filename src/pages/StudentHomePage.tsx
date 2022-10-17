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
    <>
      <h1>Student {auth.currentUser?.displayName}</h1>
      <button
        onClick={() => {
          signOut(auth);
          navigate("/login");
        }}
      >
        Logout
      </button>
    </>
  );
};

export default StudentHomePage;
