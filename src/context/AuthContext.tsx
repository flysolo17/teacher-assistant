import React, { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../config/config";
import { onAuthStateChanged, User } from "firebase/auth";

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}
export interface AuthProviderProps {
  children: any;
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = (
  props
) => {
  const { children } = props;
  const [currentUser, setCurrentUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user != null) {
        setCurrentUser(user);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
