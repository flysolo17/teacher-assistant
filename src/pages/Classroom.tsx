import {
  Button,
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
interface ClassroomPageProps {}

const ClassroomPage: React.FunctionComponent<ClassroomPageProps> = (props) => {
  const { id } = useParams();
  const [classroom, setClassroom] = useState<Classroom>();
  const [invitation, setInvitation] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [pickedFile, setPickedFile] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [lesson, setLesson] = useState<any[]>([]);
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
    getClassroomData();
  }, []);

  useEffect(() => {
    const q = query(
      collection(firestore, "Classroom", id!, "Invitations"),
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

  function isInvited(userID: string): boolean {
    let invited = false;
    invitation.forEach((invitation) => {
      if (invitation.studentID == userID) {
        invited = true;
      }
    });
    return invited;
  }

  const handdleOnChange = (e: any) => {
    const file = e.target.files[0];
    setPickedFile(file);
    setOpen(true);
  };


  //get lessons
  useEffect(() => {
    const q = query(
      collection(firestore, "Lessons"),
      where("classroomID", "==", id)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let data: any[] = [];
      querySnapshot.forEach((docs) => {
        data.push({ ...docs.data(), id: docs.id });
      });
      console.log("rendered: lessons");
      setLesson(data);
    });
    return () => unsub();
  }, []);

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
                    isInvited={isInvited(user.id)}
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
                    accept="application/pdf"
                    type="file"
                    onChange={handdleOnChange}
                  />
                </Button>
              </Stack>
            </Stack>
            <Divider />
            {lesson.length > 0 ? (
              <Grid
                container
                columns={{ xs: 4, sm: 8, md: 12 }}
                sx={{ padding: 2 }}
                spacing={{ xs: 2, md: 3 }}
              >
                {lesson.map((data) => (
                  <Grid item xs={2} sm={4} md={4} key={data.id}>
                    <LessonsCard
                      key={data.id}
                      lesson={data}
                      lessonsID={data.id}
                    />
                  </Grid>
                ))}
              </Grid>
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
            )}
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack sx={{ width: "30%", height: "100%" }} direction={"column"}>
            <Typography component={"h2"} variant={"h5"} sx={{ margin: 2 }}>
              Quiz
            </Typography>
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
