import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { studentNavData, teacherNavData } from "./NavData";
import Person from "../images/class09.jpg";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { firestore } from "../config/config";
import { doc, getDoc } from "firebase/firestore";
import { userConverter, Users } from "../model/User";
import { Avatar, CircularProgress, Container, IconButton } from "@mui/material";
import "../styles/nav.css";
import LogoutIcon from "@mui/icons-material/Logout";
const drawerWidth = 300;

interface Props {
  children: any;
}

const NavigationBar: React.FunctionComponent<Props> = (props) => {
  const { children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { currentUser, loading, logout } = useAuth();
  const [user, setUser] = useState<Users | null>(null);

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
  function getNavData(userType: string): {
    title: string;
    path: string;
    icon: JSX.Element;
  }[] {
    if (userType === "Teacher") {
      return teacherNavData;
    } else {
      return studentNavData;
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      ></AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <Stack>
          <Typography
            variant={"h5"}
            component={"h1"}
            padding={5}
            sx={{
              color: " #070707",
              fontFamily: "Poppins",
              fontStyle: "regular",
              fontWeight: 400,
            }}
          >
            Teacher Assistant
          </Typography>
        </Stack>
        <List
          sx={{
            height: "80%",
          }}
        >
          {user !== null &&
            getNavData(user.type).map((item) => (
              <ListItem
                key={item.title}
                onClick={() => navigate(item.path)}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon color="black">{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          color: "black",
                          fontSize: 20,
                          fontFamily: "poppins",
                        }}
                      >
                        {item.title}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
        <Stack sx={{ padding: 1 }} direction={"row"} spacing={1}>
          <Avatar
            sx={{ width: 60, height: 60 }}
            src={user?.profile[user.profile.length - 1]}
            alt={"profile"}
          />
          <Stack direction={"column"}>
            <Typography
              variant={"h6"}
              component={"h5"}
              sx={{
                color: " #070707",
                fontFamily: "Poppins",
                fontStyle: "regular",
                fontWeight: 400,
              }}
            >
              {user?.firstName + " " + user?.middleName + " " + user?.lastName}
            </Typography>
            <Typography
              variant={"h6"}
              sx={{
                fontFamily: "Poppins",
                fontStyle: "regular",
                fontWeight: 400,
              }}
            >
              {user?.type}
            </Typography>
          </Stack>
        </Stack>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
export default NavigationBar;
