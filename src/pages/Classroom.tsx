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
import { Height } from "@mui/icons-material";

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
    <Stack
      sx={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
      direction="row"
    >
      <Container sx={{ width: "20%", overflow: "auto" }}>
        <Typography component={"h2"} variant={"h5"} sx={{ margin: 2 }}>
          Mga Studyante
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
              users.map((user, index) => (
                <li key={user.id}>
                  {classroom.students.includes(user.id) && (
                    <StudentsCard
                      user={user}
                      userID={user.id}
                      index={index}
                      classroomID={id!}
                    />
                  )}
                </li>
              ))
            ) : (
              <h1>Wala pang studyante</h1>
            ))}
          <Typography
            component={"h2"}
            variant={"h5"}
            sx={{ margin: 2 }}
          ></Typography>
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

        <Divider orientation="vertical" flexItem />
      </Container>
      <Container sx={{ width: "50%" }}>
        <Typography component={"h2"} variant={"h3"} sx={{ margin: 2 }}>
          {classroom?.className}
        </Typography>
        <Divider />
        <Container
          sx={{
            width: "100%",
            overflow: "auto",
            height: "90%",
          }}
        >
                 {" "}
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
                                 {" "}
                <img src={nolessons} width="500px" height={"400px"} />         
                       {" "}
                <Typography component={"h2"} variant={"h5"}>
                                      Wala pang mga aralin                  {" "}
                </Typography>
                               {" "}
              </Stack>
            ))}
        </Container>
      </Container>
      <Container sx={{ width: "30%" }}>
        <Stack
          direction={"row"}
          sx={{ padding: "1rem", justifyContent: "space-between" }}
        >
          <Typography component={"h2"} variant={"h5"} sx={{ margin: 2 }}>
            Pagsusulit
          </Typography>

          <Button
            color={"success"}
            variant={"contained"}
            onClick={navigateToCreateQuiz}
          >
            Gumawa ng pagsusulit
          </Button>
        </Stack>
        <Divider />
        <List sx={{ width: "100%", height: "100%", overflow: "auto" }}>
          {quiz.map((data) => (
            <QuizCard
              quiz={data}
              key={data.id}
              clickQuiz={() => navigateToViewQuiz(data.id)}
            />
          ))}
        </List>
      </Container>
    </Stack>
  );
};

export default ClassroomPage;
