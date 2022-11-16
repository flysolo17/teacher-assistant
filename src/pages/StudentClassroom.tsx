import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { cpSync } from "fs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../config/config";
import { Classroom, classroomConveter } from "../model/Classroom";
import { userConverter, Users } from "../model/User";
import nolessons from "../images/nolessons.png";
import LessonsCard from "../components/LessonsCard";
interface StudentClassroomPageProps {}

const StudentClassroomPage: React.FunctionComponent<
  StudentClassroomPageProps
> = () => {
  const { id } = useParams();
  const [classroom, setClassroom] = useState<Classroom>();
  const [teacher, setTeacher] = useState<Users>();
  const [loading, setLoading] = useState(false);
  async function getClassroomData() {
    const docRef = doc(firestore, "Classroom", id!).withConverter(
      classroomConveter
    );
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      let id = snap.data()["teacher"];
      setClassroom(snap.data());
      getTeacherData(id);
    }
  }
  async function getTeacherData(teacherID: string) {
    const docRef = doc(firestore, "Users", teacherID).withConverter(
      userConverter
    );
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      setTeacher(snap.data());
    }
  }
  useEffect(() => {
    getClassroomData();
  }, []);
  if (loading)
    return (
      <Container
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItem: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Container>
    );
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100vh",
      }}
      direction={"row"}
    >
      <Stack
        sx={{
          width: "25%",

          padding: 2,
        }}
        direction={"column"}
      >
        <Container
          sx={{
            padding: 2,
            borderRadius: 5,
            backgroundColor: "#CAFBDA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={teacher?.profile[teacher.profile.length - 1]}
            sx={{
              width: 100,
              height: 100,
              border: 2,
              borderColor: "white",
            }}
          />
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 400,
              fontSize: 25,
              fontStyle: "normal",
            }}
          >
            {teacher?.firstName} {teacher?.middleName} {teacher?.lastName}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 400,
              fontSize: 20,
              fontStyle: "normal",
            }}
          >
            Teacher
          </Typography>
        </Container>
      </Stack>
      <Stack
        sx={{
          width: "75%",
          padding: 2,
        }}
        direction-="column"
      >
        <Box
          sx={{
            padding: 4,
            margin: 1,
            borderRadius: 5,
            backgroundColor: "#CAFBDA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 700,
              fontSize: 40,
              fontStyle: "normal",
            }}
          >
            {classroom?.className}
          </Typography>
        </Box>
        <Divider />
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: 400,
            fontSize: 25,
            fontStyle: "normal",
            margin: 2,
          }}
        >
          Lessons
        </Typography>
        {classroom != null &&
          (classroom.lessons != null && classroom?.lessons.length > 0 ? (
            classroom.lessons.map((data, index) => (
              <LessonsCard key={index} lesson={data} />
            ))
          ) : (
            <Stack
              sx={{
                width: "100%",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              direction={"column"}
              spacing={1}
            >
              <img src={nolessons} width="500px" height={"400px"} />
              <Typography component={"h2"} variant={"h5"}>
                No lessons yet!
              </Typography>
            </Stack>
          ))}
      </Stack>
    </Stack>
  );
};

export default StudentClassroomPage;
