import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
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
import LogoutIcon from "@mui/icons-material/Logout";
interface AccountPageProps {}

const AccountPage: React.FunctionComponent<AccountPageProps> = (props) => {
  const { logout, currentUser, loading } = useAuth();

  const [users, setUser] = useState<Users | null>(null);
  const navigate = useNavigate();


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
  }, []);

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
    <>
      <div className="account-main">
        <div className="account-profile">
          <Avatar
            sx={{ width: 180, height: 180 }}
            src={users?.profile[users.profile.length - 1]}
            alt={"profile"}
          />
          <div className="account-info">
            <Stack
              direction={"row"}
              sx={{ display: "flex", alignItems: "center" }}
              spacing={2}
            >
              <p className="name">{fullname}</p>
              <Button
                variant={"outlined"}
                sx={{
                  width: 150,
                  height: 30,
                  color: "black",

                  borderColor: "black",
                  "&:hover": {
                    backgroundColor: "#0069d9",
                    borderColor: "#0062cc",
                    boxShadow: "none",
                    color: "white",
                  },
                }}
                size="small"
                onClick={() => navigate("/profile/edit/" + currentUser?.uid!)}
              >
                Edit
              </Button>
              <IconButton
                aria-label="logout"
                sx={{ color: "black" }}
                onClick={logout}
              >
                <LogoutIcon />
              </IconButton>
            </Stack>

            <Stack direction={"column"} sx={{ marginY: 2 }}>
              <p className="email">{users?.email}</p>
              <p className="type">{users?.type}</p>
            </Stack>
          </div>
        </div>
        <Stack
          direction={"column"}
          sx={{ marginTop: 2, width: "60%" }}
          spacing={2}
        >
          <Typography
            variant={"h5"}
            sx={{ fontWeight: 300, fontFamily: "poppins" }}
          >
            Your Images
          </Typography>
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
        </Stack>
      </div>
    </>
  );
};

export default AccountPage;
