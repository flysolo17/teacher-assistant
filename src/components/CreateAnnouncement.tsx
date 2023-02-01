import { Announcement } from "../model/Announcement";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import { collection, doc, setDoc, WriteBatch } from "firebase/firestore";
import { firestore } from "../config/config";
import { timestamp } from "../utils/Constants";
interface CreateAnnouncementDialogProps {
  message: string;
  link: string;
  classroom: any[];
  teacherID: string;
}

const CreateAnnouncementDialog: React.FunctionComponent<
  CreateAnnouncementDialogProps
> = (props) => {
  const { message, classroom, teacherID, link } = props;
  const [open, setOpen] = React.useState(false);
  const [classes, setClasses] = React.useState<string[]>([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [checked, setChecked] = React.useState([-1]);

  const handleToggle = (index: number, value: any) => () => {
    const currentIndex = checked.indexOf(index);
    const newChecked = [...checked];
    const newClass = [...classes];
    if (currentIndex === -1) {
      newChecked.push(index);
      newClass.push(value.id);
    } else {
      newChecked.splice(currentIndex, 1);
      newClass.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    setClasses(newClass);
    console.log("classes", classroom);
    console.log(newChecked);
  };
  function createAnnouncement() {
    console.log(classes);
    const id = doc(collection(firestore, "Announcements")).id;
    if (classes.length != 0) {
      const announce: Announcement = {
        id: id,
        teacherID: teacherID,
        message: message,
        link: link,
        classrooms: classes,
        date: timestamp(),
      };
      setDoc(doc(firestore, "Announcements", id), announce)
        .then(() => {
          alert("Tagumpay ang pagkagawa ng anunsyo");
        })
        .catch((err) => alert(err.message))
        .finally(() => handleClose());
    } else {
      alert("Pumili muna ng klase");
    }
  }
  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        color={"success"}
        size={"large"}
        fullWidth
      >
        Magsagawa ng anunsyo
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"md"}
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Mga Seksyon"}</DialogTitle>
        <DialogContent>
          <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
            {classroom.map((value, index) => {
              const labelId = `checkbox-list-secondary-label-${value.className}`;
              return (
                <ListItem
                  key={value.id}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(index, value)}
                      checked={checked.indexOf(index) !== -1}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemText id={labelId} primary={value.className} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ikansela</Button>
          <Button onClick={() => createAnnouncement()} autoFocus>
            Ideklara
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateAnnouncementDialog;
