import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Lesson } from "../model/Lesson";
import { storage, firestore } from "../config/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { LESSONS_PATH } from "../utils/Constants";
import { v4 as uuidV4 } from "uuid";
import { addDoc, collection, doc } from "firebase/firestore";
import { Stack } from "@mui/system";
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
    const fileref = ref(storage, `${LESSONS_PATH}/${uuidV4()}`);
    uploadBytes(fileref, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          let lesson: Lesson = {
            url: url,
            name: file.name,
            size: file.size,
            type: file.type,
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
      const docRef = await addDoc(collection(firestore, "Lessons"), lesson);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

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
