import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Fab,
  Grid,
  IconButton,
  List,
  Paper,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";
import nolessons from "../images/nolessons.png";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../config/config";
import { Classroom, classroomConveter } from "../model/Classroom";
import { useNavigate } from "react-router-dom";

import UsersCard from "../components/UsersCard";
import StudentsCard from "../components/StudentsCard";
import { v4 as uuidV4 } from "uuid";
import ConFirmLesson from "../alerts/ConfirmLesson";
import { Lesson } from "../model/Lesson";
import LessonsCard from "../components/LessonsCard";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../context/AuthContext";
import QuizCard from "../components/QuizCard";

interface ClassroomPageProps {}

const ClassroomPage: React.FunctionComponent<ClassroomPageProps> = (props) => {
  const { id } = useParams();
  const [classroom, setClassroom] = useState<Classroom>();
  const [invitation, setInvitation] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [pickedFile, setPickedFile] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [quiz, setQuiz] = useState<any[]>([]);
  const { currentUser } = useAuth();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  async function getClassroomData() {
    const docRef = doc(firestore, "Classroom", id!).withConverter(
      classroomConveter
    );
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      setClassroom(snap.data());
      console.log("classroom data : fetch success");
    } else {
      navigate("/*");
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      const reference = collection(firestore, "Classroom", id, "Quiz");
      const quizQuery = query(reference, orderBy("createdAt", "desc"));
      const unsub = onSnapshot(quizQuery, (snapshot) => {
        let data: any[] = [];
        snapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setQuiz(data);

        console.log("quiz");
      });
      return () => unsub();
    }
  }, []);

  useEffect(() => {
    getClassroomData();
  }, []);

  useEffect(() => {
    const q = query(
      collection(firestore, "Invitations"),
      where("classID", "==", id!)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let data: any[] = [];
      querySnapshot.forEach((docs) => {
        data.push({ ...docs.data(), id: docs.id });
      });
      console.log("rendered: invites");
      setInvitation(data);
    });

    return () => unsub();
  }, []);

  function identifyIfInvited(userID: string): boolean {
    let invited = false;
    invitation.map((invitation) => {
      if (invitation.studentID == userID) {
        invited = true;
      }
    });
    return invited;
  }
  function getInvitionID(userID: string, classroomID: string): string {
    let id = "";
    invitation.map((invitation) => {
      if (invitation.studentID == userID && invitation.classID == classroomID) {
        id = invitation.id;
      }
    });
    return id;
  }
  const navigateToCreateQuiz = () => {
    navigate("create-quiz");
  };
  const navigateToViewQuiz = (id: string) => {
    navigate("view-quiz/" + id);
  };

  useEffect(() => {
    const q = query(
      collection(firestore, "Users"),
      where("type", "==", "Student")
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let data: any[] = [];
      querySnapshot.forEach((docs) => {
        data.push({ ...docs.data(), id: docs.id });
      });
      console.log("rendered: Classroom");
      setUsers(data);
    });
    return () => unsub();
  }, []);

  const handdleOnChange = (e: any) => {
    const file = e.target.files[0];
    if (file.size < 5000000) {
      setPickedFile(file);
      setOpen(true);
    } else {
      console.error("Invalid");
    }
  };

  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%", height: "100vh" }}>
        <Stack direction={"column"} sx={{ width: "20%", padding: 1 }}>
          <Typography component={"h2"} variant={"h5"} sx={{ margin: 2 }}>
            Students
          </Typography>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              position: "relative",
              overflow: "auto",
              maxHeight: "100%s",
              "& ul": { padding: 0 },
            }}
          >
            {classroom != null &&
              (classroom?.students.length > 0 ? (
                users.map((user) => (
                  <li key={user.id}>
                    {classroom.students.includes(user.id) && (
                      <StudentsCard user={user} userID={user.id} />
                    )}
                  </li>
                ))
              ) : (
                <h1>No students</h1>
              ))}
            <Typography component={"h2"} variant={"h5"} sx={{ margin: 2 }}>
              Other
            </Typography>

            {users.map((user) => (
              <li key={user.id}>
                {!classroom?.students.includes(user.id) && (
                  <UsersCard
                    user={user}
                    classID={id!}
                    isInvited={identifyIfInvited(user.id)}
                    inviteID={getInvitionID(user.id, id!)}
                    teacherID={classroom?.teacher!}
                    className={classroom?.className!}
                  />
                )}
              </li>
            ))}
          </List>
        </Stack>
        <Divider orientation="vertical" flexItem />

        <Stack sx={{ width: "80%", height: "100%" }} direction={"row"}>
          <Stack sx={{ width: "70%", height: "100%" }} direction={"column"}>
            <Stack
              direction={"row"}
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Typography component={"h2"} variant={"h5"} sx={{ margin: 2 }}>
                {classroom?.className}
              </Typography>
              <Stack direction={"row"} spacing={2} padding={2}>
                <IconButton>
                  <DeleteIcon color="error" />
                </IconButton>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<AddIcon />}
                  color="warning"
                >
                  Upload
                  <input
                    hidden
                    accept="application/pdf, application/msword, image/*"
                    type="file"
                    onChange={handdleOnChange}
                  />
                </Button>
              </Stack>
            </Stack>
            <Divider />
            {classroom != null &&
              (classroom.lessons != null && classroom?.lessons.length > 0 ? (
                classroom.lessons.map((data, index) => (
                  <LessonsCard key={index} lesson={data} />
                ))
              ) : (
                <Stack
                  sx={{
                    width: "100%",
                    height: "100%",
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
          <Divider orientation="vertical" flexItem />
          <Stack
            sx={{ width: "30%", height: "100%", paddingX: 2 }}
            direction={"column"}
          >
            <Container
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography component={"h2"} variant={"h5"} sx={{ margin: 2 }}>
                Quiz
              </Typography>
              <Button
                color={"success"}
                variant={"contained"}
                onClick={navigateToCreateQuiz}
              >
                Create Quiz
              </Button>
            </Container>
            <List sx={{ width: "100%" }}>
              {quiz.map((data) => (
                <QuizCard
                  quiz={data}
                  key={data.id}
                  clickQuiz={() => navigateToViewQuiz(data.id)}
                />
              ))}
            </List>
          </Stack>
        </Stack>
      </Stack>
      <ConFirmLesson
        open={open}
        handleClose={handleClose}
        handleOpen={handleClickOpen}
        file={pickedFile}
        classroomID={id!}
      />
    </>
  );
};

export default ClassroomPage;
