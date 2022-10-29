import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { auth, firestore, storage } from "../config/config";
import React, { useEffect, useState } from "react";
import { userConverter, Users } from "../model/User";
import { doc, getDoc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { experimentalStyled as styled } from "@mui/material/styles";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { PROFILE_PATH } from "../utils/Constants";

interface AccountPageProps {}

const AccountPage: React.FunctionComponent<AccountPageProps> = (props) => {
  const { logout, currentUser, loading } = useAuth();

  const [users, setUser] = useState<Users | null>(null);
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const fullname =
    users?.firstName + " " + users?.middleName + " " + users?.lastName;

  async function getAccount() {
    const docRef = doc(firestore, "Users", currentUser?.uid!).withConverter(
      userConverter
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUser(docSnap.data());
    }
  }
  useEffect(() => {
    if (currentUser != null) {
      getAccount();
    }
  }, [currentUser]);

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
    <Stack
      sx={{
        width: "100%",
        padding: 5,
        margin: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      direction={"column"}
      spacing={1}
    >
      <Avatar
        src={users?.profile[users.profile.length - 1]}
        alt="profile"
        sx={{ width: 150, height: 150 }}
      />
      <Typography
        variant="h4"
        component="div"
        sx={{ display: "inline-block" }}
        color={"black"}
      >
        {fullname}
      </Typography>

      <Typography fontSize={24}>{users?.email}</Typography>

      <Stack direction={"row"} spacing={2} sx={{ margin: 2 }}>
        <Button
          variant={"outlined"}
          size={"small"}
          sx={{ width: 300 }}
          onClick={() => navigate("/profile/edit/" + currentUser?.uid!)}
        >
          Edit Profile
        </Button>
        <Button
          variant={"outlined"}
          sx={{ width: 300 }}
          size={"small"}
          onClick={logout}
        >
          Logout
        </Button>
      </Stack>

      <Box sx={{ width: "60%", height: 200 }}>
        .<Typography variant={"h5"}>Your Profiles</Typography>
        <Divider sx={{ marginY: 2, backgroundColor: "black" }} />
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {users?.profile.map((url) => {
            return (
              <Grid item xs={2} sm={4} md={4}>
                <img src={url} loading="lazy" height={300} width={300} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Stack>
  );
};

export default AccountPage;
