import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../config/config";
import { Classroom, classroomConveter } from "../model/Classroom";
import { useAuth } from "../context/AuthContext";
import { Stack } from "@mui/system";
import { userConverter, Users } from "../model/User";
import { Avatar } from "@mui/material";
interface StudentGradePageProps {}

const StudentGradePage: React.FunctionComponent<StudentGradePageProps> = () => {
  const [grades, setGrades] = useState<any[]>([]);
  const { currentUser } = useAuth();
  const [user, setUser] = useState<Users | null>(null);
  function getGrades(uid: string) {
    const q = query(
      collection(firestore, "Grades"),
      where("studentID", "==", uid),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      let data: any[] = [];
      snapshot.forEach((docs) => {
        if (docs.exists()) {
          getDoc(
            doc(
              firestore,
              "Classroom",
              docs.data()["classroomID"]
            ).withConverter(classroomConveter)
          ).then((snap) => {
            if (snap.exists()) {
              data.push({
                ...docs.data(),
                id: docs.id,
                className: snap.data().className,
              });
            } else {
              data.push({
                ...docs.data(),
                id: docs.id,
                className: "walang pangalan",
              });
            }
            setGrades(data);
          });

          console.log("grado", data);
        }
      });
    });
    return () => unsub();
  }
  useEffect(() => {
    if (currentUser != null) {
      getGrades(currentUser.uid);
    }
  }, []);
  async function getProfile(params: string) {
    try {
      const ref = await getDoc(
        doc(firestore, "Users", params).withConverter(userConverter)
      );
      if (ref.exists()) {
        setUser(ref.data());
      }
    } catch (e) {
      alert(e);
    }
  }
  useEffect(() => {
    if (currentUser != null) {
      getProfile(currentUser.uid);
    }
  }, []);

  const fullname =
    user?.firstName + " " + user?.middleName + " " + user?.lastName;

  return (
    <Stack direction={"column"} spacing={2} sx={{ width: "100%", padding: 2 }}>
      <Avatar
        sx={{ width: 100, height: 100 }}
        src={user?.profile[user.profile.length - 1]}
        alt={"profile"}
      />
      <h2>{fullname}</h2>
      <TableContainer>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <h3>Klase</h3>
              </TableCell>
              <TableCell align="center">
                <h3>Unang Markahan</h3>
              </TableCell>
              <TableCell align="center">
                <h3>Ikalawang Markahan</h3>
              </TableCell>
              <TableCell align="center">
                <h3>Ikatlong Markahan</h3>
              </TableCell>
              <TableCell align="center">
                <h3>Ikaapat na Markahan</h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grades.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.className}
                </TableCell>
                <TableCell align="center">{row.grade.first}</TableCell>
                <TableCell align="center">{row.grade.second}</TableCell>
                <TableCell align="center">{row.grade.third}</TableCell>
                <TableCell align="center">{row.grade.fourth}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default StudentGradePage;
