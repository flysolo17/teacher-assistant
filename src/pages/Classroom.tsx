import { Users } from "../model/User";
import {
  Button,
  Box,
  TextField,
  LinearProgress,
  Stack,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Classroom, classroomConveter } from "../model/Classroom";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { height } from "@mui/system";

interface ClassRoomPageProps {
  userId: string;
}

const ClassRoomPage: React.FunctionComponent<ClassRoomPageProps> = (props) => {
  const { userId } = props;
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
      const docRef = await addDoc(collection(firestore, "Classroom"), {
        ...classroom,
        teacher: userId,
        createdAt: new Date(),
      });
      console.log(docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setLoading(false);
  }

  return (
    <>
      {loading && <LinearProgress />}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box>
          <Box
            sx={{
              width: 400,
              padding: 1,
              borderRadius: 5,
              backgroundColor: "#E4E7EC",
            }}
          >
            <Stack direction={"column"} spacing={2}>
              <TextField
                label="Section"
                variant="standard"
                value={classroom.section}
                onChange={(e) =>
                  setClassroom({ ...classroom, section: e.target.value })
                }
              />

              <Button
                color="success"
                onClick={() => createClassroom(classroom)}
              >
                Create Claassroom
              </Button>
            </Stack>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src="images/book.png" />
        </Box>
      </Box>
    </>
  );
};

export default ClassRoomPage;
