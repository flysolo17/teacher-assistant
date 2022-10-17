import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Add } from "@mui/icons-material";
import { Paper, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { colorPicker } from "../utils/Constants";
import { Classroom } from "../model/Classroom";
import { firestore } from "../config/config";
import { doc, addDoc, collection } from "firebase/firestore";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
export interface ICreateDialogProps {
  userId: string;
}

const CreateClassDialog: React.FunctionComponent<ICreateDialogProps> = (
  props
) => {
  const { userId } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState("#fff");
  const [title, setTitle] = React.useState<string>("Classroom name");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveClassroom = async () => {
    await addDoc(collection(firestore, "Classroom"), {
      className: title,
      createdAt: new Date(),
      color: selectedColor,
      students: [],
      lessons: [],
      announcements: [],
      teacher: userId,
    });
    console.log("Added!");
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} startIcon={<Add />}>
        Create Class
      </Button>
      <BootstrapDialog
        maxWidth={"sm"}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ backgroundColor: selectedColor }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Create Classroom
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Stack sx={{ width: "100%" }} spacing={2} direction="column">
            <TextField
              variant="outlined"
              label="Classroom name"
              value={title}
              fullWidth
              onChange={(e) => setTitle(e.target.value)}
            />
            <Stack direction={"row"} spacing={2}>
              {colorPicker.map((color) => (
                <Paper
                  onClick={() => setSelectedColor(color)}
                  sx={{ width: 30, height: 30, backgroundColor: color }}
                ></Paper>
              ))}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={saveClassroom}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};
export default CreateClassDialog;
