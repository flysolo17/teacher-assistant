import { Users } from "../model/User";
import {
  Button,
  Box,
  TextField,
  LinearProgress,
  Stack,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { Classroom } from "../model/Classroom";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { auth } from "../config/config";
interface ClassRoomPageProps {}

const ClassRoomPage: React.FunctionComponent<ClassRoomPageProps> = (props) => {
  const firestore = getFirestore();
  const [loading, setLoading] = useState(false);
  const [classroom, setClassroom] = useState<Classroom>({
    teacher: "",
    section: "",
    createdAt: 0,
    students: [],
    modules: [],
    announcements: [],
  });

  async function createClassroom(classroom: Classroom) {
    setLoading(true);
    try {
      if (auth != null) {
        const docRef = await addDoc(collection(firestore, "Classroom"), {
          ...classroom,
          teacher: auth.currentUser?.uid,
          createdAt: new Date(),
        });
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setLoading(false);
  }

  return (
    <>
      {loading && <LinearProgress />}
      <Stack direction={"column"} spacing={2}>
        <TextField
          label="Section"
          variant="standard"
          value={classroom.section}
          onChange={(e) =>
            setClassroom({ ...classroom, section: e.target.value })
          }
        />
        <Button color="success" onClick={() => createClassroom(classroom)}>
          Create Claassroom
        </Button>
      </Stack>
    </>
  );
};

export default ClassRoomPage;
