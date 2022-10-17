import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import NavigationBar from "./NavBar";

import { useAuth } from "../context/AuthContext";
export interface IAuthRouteProps {
  children: any;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser != null) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <NavigationBar>{children}</NavigationBar>
    </>
  );
};

export default AuthRoute;
