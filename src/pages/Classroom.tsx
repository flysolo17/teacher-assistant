import {
  Alert,
  AlertTitle,
  AppBar,
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
  Toolbar,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import {
  collection,
  doc,
  getDoc,
  getDocs,
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
import ConFirmLesson from "../alerts/ConfirmLesson";
import LessonsCard from "../components/LessonsCard";
import { useAuth } from "../context/AuthContext";
import QuizCard from "../components/QuizCard";
import { act } from "react-dom/test-utils";
interface ClassroomPageProps {}

const ClassroomPage: React.FunctionComponent<ClassroomPageProps> = (props) => {
  const { id } = useParams();
  const [classroom, setClassroom] = useState<Classroom>();
  const [invitation, setInvitation] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [pickedFile, setPickedFile] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [quiz, setQuiz] = useState<any[]>([]);

  async function getActivities(id: string) {
    console.log("activities");
    const q = query(
      collection(firestore, "Activities"),
      where("classroomID", "array-contains", id),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    let data: any[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    setActivities(data);
    console.log("activities", data);
  }
  useEffect(() => {
    if (id != undefined) {
      getActivities(id);
    }
  }, []);
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
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
      direction="row"
    >
      <Container sx={{ width: "25%", overflow: "auto" }}>
        <Typography component={"h2"} variant={"h5"} sx={{ margin: 2 }}>
          Mga Studyante
        </Typography>
        <List
          sx={{
            width: "100%",
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
              <Typography
                sx={{ textAlign: "center" }}
                component={"h2"}
                variant={"h6"}
              >
                Wala pang studyante
              </Typography>
            ))}
          <Divider />
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
      <Container sx={{ width: "45%" }}>
        <Stack
          direction={"row"}
          sx={{ justifyContent: "space-between", padding: "1rem" }}
        >
          <Typography component={"h2"} variant={"h5"}>
            {classroom?.className}
          </Typography>
        </Stack>

        <Divider />
        <Container
          sx={{
            width: "100%",
            overflow: "auto",
            height: "90%",
          }}
        >
          {" "}
          {activities != null &&
            (activities != null && activities.length > 0 ? (
              activities.map((data, index) => (
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
                <img src={nolessons} width="500px" height={"400px"} />{" "}
                <Typography component={"h2"} variant={"h5"}>
                  Wala pang mga aralin
                </Typography>
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
      <ConFirmLesson
        open={open}
        handleClose={handleClose}
        handleOpen={handleClickOpen}
        file={pickedFile}
        classroomID={id!}
      />
    </Stack>
  );
};

export default ClassroomPage;
