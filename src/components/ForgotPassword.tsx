import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/config";
import KeyIcon from "@mui/icons-material/Key";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ForgotPasswordProps {}

const ForgotPassword: React.FunctionComponent<ForgotPasswordProps> = () => {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast("Success");
      handleClose();
    } catch {
      toast("Error");
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        fullWidth
        disableElevation
        color="error"
        onClick={handleClickOpen}
        startIcon={<KeyIcon />}
      >
        Nakalimutan ang password
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nakalimutan ang password?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Kailangan naming kunin ang iyong email address para kami ay makapag
            pasa ng password reset form.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => handleSubmit(e)}>Send</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
