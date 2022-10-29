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
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { firestore } from "../config/config";
import { async } from "@firebase/util";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
interface IStudentsCardProps {
  user: Users;
  userID: string;
}

const StudentsCard: React.FunctionComponent<IStudentsCardProps> = (props) => {
  const { user, userID } = props;
  const fullName = user.firstName + " " + user.middleName + " " + user.lastName;
  return (
    <>
      <ul>
        <Stack direction={"row"} spacing={2} margin={1}>
          <Avatar
            alt="Profile"
            src={user.profile[0]}
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
        </Stack>
        <Divider variant="inset" />
      </ul>
    </>
  );
};

export default StudentsCard;
