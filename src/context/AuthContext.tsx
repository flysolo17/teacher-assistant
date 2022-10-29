import React, { useContext, useState, useEffect, createContext } from "react";
import { auth, firestore } from "../config/config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { Users } from "../model/User";
import { doc, setDoc } from "firebase/firestore";
import { CircularProgress, Container } from "@mui/material";

interface IAuthContextProps {
  currentUser: User | null;
  signup: (email: string, password: string, users: Users) => void;
  login: (email: string, password: string) => void;
  logout: any;
  loading: boolean;
}
const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

export function useAuth() {
  return useContext(AuthContext);
}
export interface AuthProviderProps {
  children: any;
  current: User | null;
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = (
  props
) => {
  const { children, current } = props;
  const [currentUser, setCurrentUser] = useState<User | null>(current);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const login = (email: string, password: string) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        setCurrentUser(credential.user);
        console.log(credential.user);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signup = (email: string, password: string, users: Users) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        setCurrentUser(credential.user);
        console.log(credential.user);
        createUser({ ...users, id: credential.user.uid });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const createUser = async (user: Users) => {
    try {
      await setDoc(doc(firestore, "Users", user.id), user);
      console.log("success!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const logout = () => {
    auth
      .signOut()
      .then(() => {
        setCurrentUser(null);
      })
      .catch(() => {
        console.log("error logout");
      })
      .finally(() => {
        console.log("logout successful");
      });
  };

  const value = {
    currentUser: currentUser,
    login,
    logout,
    signup,
    loading,
  };
  if (loading) {
    return (
      <>
        <Container
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Container>
      </>
    );
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
