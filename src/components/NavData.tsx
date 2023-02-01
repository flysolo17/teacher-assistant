import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Campaign } from "@mui/icons-material";
import NoteIcon from "@mui/icons-material/Note";
import GroupIcon from "@mui/icons-material/Group";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import ClassIcon from "@mui/icons-material/Class";
export const teacherNavData = [
  {
    title: "Mga Klase",
    path: "/classroom",
    icon: <HomeIcon />,
  },
  {
    title: "Aktibidad",
    path: "/create-activity",
    icon: <NoteAddIcon />,
  },


  {
    title: "Anunsyo",
    path: "/announcement",
    icon: <Campaign />,
  },
  {
    title: "Aming Grupo",
    path: "/developers",
    icon: <GroupsIcon />,
  },
  {
    title: "Aking profile",
    path: "/profile",
    icon: <AccountCircleIcon />,
  },
];

export const studentNavData = [
  {
    title: "Mga Klase",
    path: "/classroom",
    icon: <HomeIcon />,
  },
  {
    title: "Grado",
    path: "/grades",
    icon: <ClassIcon />,
  },
  {
    title: "Aming Grupo",
    path: "/developers",
    icon: <GroupsIcon />,
  },
  {
    title: "Aking profile",
    path: "/profile",
    icon: <AccountCircleIcon />,
  },
];
