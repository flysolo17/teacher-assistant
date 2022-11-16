import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Classroom } from "../model/Classroom";
import { Invitation } from "../model/Invitation";
import { userConverter, Users } from "../model/User";
import { firestore } from "../config/config";
import {
  arrayUnion,
  deleteDoc,
  doc,
  FieldValue,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useStepperContext } from "@mui/material";

export interface InvitationCardProps {
  invitations: Invitation;
  teacher: Users;
  id: string;
}

const InvitationCard: React.FunctionComponent<InvitationCardProps> = (
  props
) => {
  const { invitations, teacher, id } = props;

  const full_name =
    teacher.firstName + " " + teacher.middleName + " " + teacher.lastName;
  const declineInvite = () => {
    deleteDoc(doc(firestore, "Invitations", id))
      .then(() => {
        console.log("deleted");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("session closed");
      });
  };
  const acceptInvite = () => {
    const docref = doc(firestore, "Classroom", invitations.classID);
    updateDoc(docref, {
      students: arrayUnion(invitations.studentID),
    })
      .then(() => {
        console.log("Success");
        declineInvite();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Profile" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={full_name}
          secondary={
            <React.Fragment>
              <Stack direction={"column"}>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Invited you to join {invitations.className}
                </Typography>
                <Stack
                  direction={"row"}
                  spacing={1}
                  sx={{ width: "100%", amrgin: 1 }}
                >
                  <Button onClick={declineInvite} color="error" fullWidth>
                    Decline
                  </Button>
                  <Button onClick={acceptInvite} fullWidth>
                    Accept
                  </Button>
                </Stack>
              </Stack>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default InvitationCard;
