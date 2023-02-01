import { RefreshSharp } from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore } from "../config/config";
import { useAuth } from "../context/AuthContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { userConverter, Users } from "../model/User";
import { Student } from "../model/Student";
import { useParams } from "react-router-dom";
import Person3Icon from "@mui/icons-material/Person3";
import { quarters } from "../utils/Constants";
import { Grade, Grades, gradesConveter } from "../model/Grades";

interface MyStudentsPageProps {}

const MyStudentsPage: React.FunctionComponent<MyStudentsPageProps> = () => {
  const { id, studentID } = useParams();
  const [student, setStudent] = useState<Users | null>(null);
  const [first, setFirst] = useState("0");
  const [second, setSecond] = useState("0");
  const [third, setThird] = useState("0");
  const [fourth, setFourth] = useState("0");
  const [grade, setGrade] = useState<Grades | null>(null);
  async function saveGrade() {
    const r = doc(collection(firestore, "Grades"), id! + studentID!);
    await setDoc(r, {
      id: id! + studentID!,
      classroomID: id,
      studentID: studentID,
      grade: {
        first: +first,
        second: +second,
        third: +third,
        fourth: +fourth,
      },
      createdAt: new Date().getTime(),
    });
    alert("Success");
  }
  useEffect(() => {
    getStudentProfile(studentID!);
  }, []);
  function getStudentProfile(id: string) {
    getDoc(doc(firestore, "Users", id).withConverter(userConverter)).then(
      (snap) => {
        if (snap.exists()) {
          let data: Users = snap.data();
          setStudent(data);
          console.log("data", data);
        } else {
          setStudent({
            id: id,
            firstName: "Not Found!",
            middleName: "Not Found!",
            lastName: "Not Found!",
            type: "N/A",
            email: "No email",
            profile: [],
          });
        }
      }
    );
  }
  useEffect(() => {
    if (id != undefined && studentID != null) {
      getGrade(id, studentID);
    }
  }, []);

  async function getGrade(id: string, studentID: string) {
    const docRef = doc(firestore, "Grades", id + studentID).withConverter(
      gradesConveter
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data: Grades = docSnap.data();
      setFirst(data.grade.first.toString());
      setSecond(data.grade.second.toString());
      setThird(data.grade.third.toString());
      setFourth(data.grade.fourth.toString());
      setGrade(data);
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  return (
    <Stack
      spacing={2}
      direction={"row"}
      sx={{
        height: "100vh",
        width: "100%",
        padding: "1rem",
      }}
    >
      <Stack sx={{ width: "30%", height: "100%" }}>
        <Box
          sx={{
            width: "100%",
            padding: 2,
            height: "200px",
            borderRadius: 5,
            backgroundColor: "#CAFBDA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={student?.profile[student?.profile.length - 1]}
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
            {student?.firstName} {student?.middleName} {student?.lastName}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 400,
              fontSize: 20,
              fontStyle: "normal",
            }}
          >
            {student?.type}
          </Typography>
        </Box>
        <Paper
          sx={{
            width: "100%",
            padding: "1rem",
            marginTop: "1rem",
            borderRadius: 5,
          }}
          elevation={1}
        >
          <Stack direction={"column"} spacing={2} sx={{ padding: "10px" }}>
            <h3>Grado</h3>
            <br />
            <TextField
              id="standard-multiline-flexible"
              label="Unang Markahan"
              size="small"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
              type={"number"}
              variant="outlined"
            />
            <TextField
              id="standard-multiline-flexible"
              label="Ikalawang Markahan"
              size="small"
              value={second}
              onChange={(e) => setSecond(e.target.value)}
              type={"number"}
              variant="outlined"
            />
            <TextField
              id="standard-multiline-flexible"
              label="Ikatlong Markahan"
              size="small"
              value={third}
              onChange={(e) => setThird(e.target.value)}
              type={"number"}
              variant="outlined"
            />
            <TextField
              id="standard-multiline-flexible"
              label="Ikaapat na Markahan"
              size="small"
              type={"number"}
              value={fourth}
              onChange={(e) => setFourth(e.target.value)}
              variant="outlined"
            />
            <Button variant={"contained"} onClick={() => saveGrade()}>
              ISUBMIT
            </Button>
          </Stack>
        </Paper>
      </Stack>
      <Stack
        sx={{
          flexGrow: 1,
          margin: 1,
        }}
        direction="column"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            width: "100%",
            backgroundColor: "#CAFBDA",
          }}
        >
          <h1>Grado</h1>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem",
          }}
        >
          <h4>Unang Markahan</h4>
          <h4>{grade?.grade.first}</h4>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem",
          }}
        >
          <h4>Ikalawang Markahan</h4>
          <h4>{grade?.grade.second}</h4>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem",
          }}
        >
          <h4>Ikatlong Markahan</h4>
          <h4>{grade?.grade.third}</h4>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem",
          }}
        >
          <h4>Ikaapat na Markahan</h4>
          <h4>{grade?.grade.fourth}</h4>
        </Box>
      </Stack>
    </Stack>
  );
};

export default MyStudentsPage;
