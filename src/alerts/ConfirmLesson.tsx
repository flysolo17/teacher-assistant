import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Lesson } from "../model/Lesson";
import { storage, firestore } from "../config/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { LESSONS_PATH, quarters } from "../utils/Constants";
import { v4 as uuidV4 } from "uuid";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Stack } from "@mui/system";
import { useState } from "react";
interface ConFirmLessonProps {
  open: boolean;
  handleClose: () => any;
  handleOpen: () => any;
  file: any;
  classroomID: string;
}

const ConFirmLesson: React.FunctionComponent<ConFirmLessonProps> = (props) => {
  const { open, handleClose, handleOpen, file, classroomID } = props;

  function uploadFile() {
    if (file == null) return;
    const fileref = ref(storage, `${LESSONS_PATH}/${classroomID}/${uuidV4()}`);
    uploadBytes(fileref, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          let lesson: Lesson = {
            url: url,
            name: file.name,
            size: file.size,
            type: file.type,
            quarter: parseInt(quarter),
            createdAt: new Date().getTime() / 1000,
            classroomID: classroomID,
          };
          createLesson(lesson);
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => handleClose());
  }
  async function createLesson(lesson: Lesson) {
    try {
      const ref = doc(firestore, "Classroom", classroomID);
      await updateDoc(ref, {
        lessons: arrayUnion(lesson),
      });
      console.log("Document written with ID: ", ref.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuarter(event.target.value);
  };
  const [quarter, setQuarter] = useState("1");
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You're about to upload new lesson!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {file != null && (
              <Stack direction={"column"}>
                <Typography variant={"h6"} component={"h2"}>
                  {file.name!}
                </Typography>
                <Typography variant={"subtitle1"} component={"h2"}>
                  size: {file.size!}
                </Typography>
                <Typography variant={"subtitle1"} component={"h2"}>
                  type: {file.type!}
                </Typography>

                <TextField
                  id="outlined-select-quater-native"
                  select
                  sx={{
                    marginY: 2,
                  }}
                  label="Select Quarter"
                  value={quarter}
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Please select quarter"
                >
                  {quarters.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Stack>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => uploadFile()} autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConFirmLesson;
