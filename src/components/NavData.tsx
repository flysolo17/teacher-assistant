import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CampaignIcon from "@mui/icons-material/Campaign";
import { Campaign } from "@mui/icons-material";
import NoteIcon from "@mui/icons-material/Note";
export const teacherNavData = [
  {
    title: "Mga Klase",
    path: "/classroom",
    icon: <HomeIcon />,
  },
  {
    title: "Pagsusulit",
    path: "/quiz",
    icon: <NoteIcon />,
  },
  {
    title: "Anunsyo",
    path: "/announcement",
    icon: <Campaign />,
  },
  {
    title: "Aking profile",
    path: "/profile",
    icon: <AccountCircleIcon />,
  },
];
export const studentNavData= [
  {
    title: "Mga Klase",
    path: "/classroom",
    icon: <HomeIcon />,
  },
  {
    title: "Aking profile",
    path: "/profile",
    icon: <AccountCircleIcon />,
  },
];