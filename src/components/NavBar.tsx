import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { navData } from "./NavData";
import { useNavigate } from "react-router-dom";

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
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              TEACHER ASSISTANT
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navData.map((item) => (
                <Button
                  key={item.title}
                  sx={{ color: "#fff" }}
                  onClick={() => navigate(item.path)}
                >
                  {item.title}
                </Button>
              ))}
            </Box>
          </Toolbar>
          <Box sx={{ display: "flex" }}>
            <AppBar component="nav">
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                >
                  TEACHER ASSISTANT
                </Typography>
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  {navData.map((item) => (
                    <Button
                      key={item.title}
                      sx={{ color: "#fff" }}
                      onClick={() => navigate(item.path)}
                    >
                      {item.title}
                    </Button>
                  ))}
                </Box>
              </Toolbar>
            </AppBar>
          </Box>
        </AppBar>

        <Toolbar />
        
        <Box component="main" sx={{ p: 3, width: "100%" }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
};
export default NavigationBar;
