import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Users } from "../model/User";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { Invitation } from "../model/Invitation";
import { addDoc, collection, doc } from "firebase/firestore";
import { firestore } from "../config/config";

export interface IUsersCardProps {
  user: Users;
  classID: string;
  isInvited: boolean;
}
const UsersCard: React.FunctionComponent<IUsersCardProps> = (props) => {
  const { user, classID, isInvited } = props;
  const fullName = user.firstName + " " + user.middleName + " " + user.lastName;
  async function inviteStudent() {
    try {
      await addDoc(collection(firestore, "Invitations"), {
        accepted: false,
        classID: classID,
        studentID: user.id,
        date: new Date(),
      });
      console.log("successfully invited: ");
    } catch (error) {
      console.error("Error inviting document: ", error);
    }
  }

  return (
    <ul>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Profile" src={user.profile} />
        </ListItemAvatar>
        <ListItemText
          primary={fullName}
          sx={{ padding: 1 }}
          secondary={
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {user.email}
            </Typography>
          }
        />
      </ListItem>

      {!isInvited ? (
        <Stack
          direction={"row"}
          spacing={2}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "end",
            justifyContent: "end",
          }}
        >
          <Button variant="contained" onClick={inviteStudent}>
            Add to class
          </Button>
          <Button variant="contained" color="error">
            Remove
          </Button>
        </Stack>
      ) : (
        <Button variant="contained" color="error">
          Remove
        </Button>
      )}

      <Divider component="li" />
    </ul>
  );
};
export default UsersCard;
