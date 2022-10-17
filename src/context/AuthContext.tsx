import React, { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../config/config";
import { onAuthStateChanged, User } from "firebase/auth";

interface IAuthContextProps {
  currentUser: User | null;
}
const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

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
  const [currenUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser: currenUser,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
