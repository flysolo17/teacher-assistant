import { Button, Paper, Stack } from "@mui/material";
import { auth, firestore } from "../config/config";
import React, { useEffect, useState } from "react";
import { userConverter, Users } from "../model/User";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
interface AccountPageProps {}

const AccountPage: React.FunctionComponent<AccountPageProps> = () => {
  const [user, setUser] = useState<Users>();
  async function getAccount() {
    const docRef = doc(
      firestore,
      "Users",
      auth.currentUser?.uid!
    ).withConverter(userConverter);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUser(docSnap.data());
    }
  }
  useEffect(() => {
    getAccount();
  }, [user]);
  return (
    <>
      <Paper
        elevation={2}
        sx={{
          width: 400,
          padding: 3,
          borderRadius: 5,
          margin: "0 auto",
          backgroundColor: "#E4E7EC",
        }}
      >
        <Stack spacing={2}>
          <h1>
            {user?.firstName + " " + user?.middleName + " " + user?.lastName}
          </h1>
          <h3>{user?.type}</h3>
          <h3>{user?.email}</h3>
          <Button onClick={() => signOut(auth)}>Logout</Button>
        </Stack>
      </Paper>
    </>
  );
};

export default AccountPage;
