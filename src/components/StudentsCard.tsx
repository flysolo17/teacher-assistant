import * as React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Users } from "../model/User";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import {
  addDoc,
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../config/config";
import { async } from "@firebase/util";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import BackspaceIcon from "@mui/icons-material/Backspace";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
interface IStudentsCardProps {
  user: Users;
  userID: string;
  index: number;
  classroomID: string;
}

const StudentsCard: React.FunctionComponent<IStudentsCardProps> = (props) => {
  const { user, userID, index, classroomID } = props;
  const fullName = user.firstName + " " + user.middleName + " " + user.lastName;
  const navigate = useNavigate();
  const deleteStudent = () => {
    updateDoc(doc(firestore, "Classroom", classroomID), {
      students: arrayRemove(user.id),
    })
      .then(() => console.log("success"))
      .catch((err) => console.log(err.message))
      .finally(() => {
        console.log("done");
      });
  };
  const navigateToStudentProfile = (id: string) => {
    navigate("student/" + id);
  };
  return (
    <>
      <ul>
        <Stack direction={"row"} spacing={2} margin={1}>
          <Avatar
            alt="Profile"
            src={user.profile[user.profile.length - 1]}
            sx={{ width: 50, height: 50 }}
          />
          <Stack direction={"column"} sx={{ width: "100%" }}>
            <Typography variant="subtitle1" component="h2">
              {fullName}
            </Typography>
            <Typography color="text.secondary" variant={"subtitle2"}>
              {user.email}
            </Typography>
          </Stack>
          <IconButton aria-label="delete" color="error" onClick={deleteStudent}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="viewprofile"
            color="success"
            onClick={() => navigateToStudentProfile(user.id)}
          >
            <AccountCircleIcon />
          </IconButton>
        </Stack>

        <Divider variant="inset" />
      </ul>
    </>
  );
};

export default StudentsCard;
