import { Avatar, Button, ListItemAvatar, Paper, Stack } from "@mui/material";
import { auth, firestore, storage } from "../config/config";
import React, { useEffect, useState } from "react";
import { userConverter, Users } from "../model/User";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { PROFILE_PATH } from "../utils/Constants";
import { v4 as uuidV4 } from "uuid";
interface AccountPageProps {}

const AccountPage: React.FunctionComponent<AccountPageProps> = () => {
  const [user, setUser] = useState<Users>();
  const [image, setImage] = useState(null);
  async function getAccount() {
    const docRef = doc(
      firestore,
      "Users",
      auth.currentUser?.uid!
    ).withConverter(userConverter);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUser(docSnap.data());
      console.log(docSnap.data());
    }
  }
  useEffect(() => {
    getAccount();
  }, []);

  function uploadProfile() {
    if (image == null) return;
    const imageRef = ref(storage, `${PROFILE_PATH}/${uuidV4()}`);
    uploadBytes(imageRef, image)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          updateUserProfile(url);
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setImage(null));
  }
  async function updateUserProfile(url: string) {
    const userRef = collection(firestore, "Users");
    await setDoc(doc(userRef, user?.id!), {
      ...user,
      profile: url,
    });
  }

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
        {user != null && (
          <Stack spacing={2}>
            <Avatar
              alt="profile"
              src={user?.profile}
              sx={{ width: 56, height: 56 }}
            />
            <input
              type={"file"}
              accept={"image/png"}
              onChange={(event: any) => {
                event.persist();
                setImage(event.target.files[0]);
              }}
            />
            <Button onClick={() => uploadProfile()}>Upload</Button>
            <h1>
              {user?.firstName + " " + user?.middleName + " " + user?.lastName}
            </h1>
            <h3>{user?.type}</h3>
            <h3>{user?.email}</h3>
            <Button onClick={() => signOut(auth)}>Logout</Button>
          </Stack>
        )}
      </Paper>
    </>
  );
};

export default AccountPage;
