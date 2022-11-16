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

import { Invitation } from "../model/Invitation";

export interface IUsersCardProps {
  user: Users;
  classID: string;
  className: string;
  isInvited: boolean;
  inviteID: string;
  teacherID: string;
}
const UsersCard: React.FunctionComponent<IUsersCardProps> = (props) => {
  const { user, classID, isInvited, inviteID,teacherID ,className} = props;
  const fullName = user.firstName + " " + user.middleName + " " + user.lastName;
  async function inviteStudent() {
    try {
      await addDoc(collection(firestore, "Invitations"), {
        accepted: false,
        classID: classID,
        className: className,
        studentID: user.id,
        teacher: teacherID,
        date: new Date().getTime() / 1000,
      });
      console.log("successfully invited: ");
    } catch (error) {
      console.error("Error inviting document: ", error);
    }
  }
  async function cancelInvite() {
    try {
      await deleteDoc(doc(firestore, "Invitations", inviteID));
      console.log("invitation cancelled: ");
    } catch (error) {
      console.error("Error canceling invite: ", error);
    }
  }

  return (
    <ul>
      <Stack direction={"row"} spacing={2} margin={1}>
        <Avatar
          alt="Profile"
          src={user.profile[user.profile.length - 1]}
          sx={{ width: 40, height: 40 }}
        />
        <Stack direction={"column"} sx={{ width: "100%" }}>
          <Typography variant="subtitle1" component="h2">
            {fullName}
          </Typography>
          <Typography color="text.secondary" variant="subtitle2">
            {user.email}
          </Typography>
          {!isInvited ? (
            <Button
              fullWidth
              variant="outlined"
              sx={{ margin: 0.5 }}
              onClick={() => inviteStudent()}
              size="small"
            >
              Add
            </Button>
          ) : (
            <Button
              fullWidth
              variant="text"
              sx={{ margin: 0.5 }}
              color={"error"}
              size="small"
              onClick={() => cancelInvite()}
            >
              cancel request
            </Button>
          )}
        </Stack>
      </Stack>
      <Divider variant="inset" />
    </ul>
  );
};
export default UsersCard;
