import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  TableContainer,
} from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import ClassroomCard from "../components/ClassroomCard";
import { userConverter, Users } from "../model/User";
import ClassRoomPage from "./Classroom";
import { auth } from "../config/config";
import { height } from "@mui/system";
interface TeacherHomePageProps {}

const TeacherHomePage: React.FunctionComponent<TeacherHomePageProps> = (
  props
) => {
  const [classrooms, setClassroom] = useState<any[]>([]);
  const firestore = getFirestore();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getAllMyClassroom();
  }, [classrooms]);

  async function getAllMyClassroom() {
    const querySnapshot = await getDocs(collection(firestore, "Classroom"));
    let data: any[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    setClassroom(data);
  }
  function createData(name: string, format: string, fileSize: string) {
    return { name, format, fileSize };
  }

  const rows = [
    createData("Module 1", "docx", "5mb"),
    createData("Module 2", "docx", "5mb"),
    createData("Video tutorial", "mp4", "60mb"),
    createData("Notes", "png", "2mb"),
  ];
  return (
    <>
      <Box sx={{ flexGrow: 1, margin: 1 }}>
        <Grid container spacing={5}>
          <Grid xs sx={{ margin: 2 }}>
            <Paper sx={{ padding: 2, height: "85vh" }}>
              <Typography variant="h5">Classrooms</Typography>
              <ClassRoomPage />
              {classrooms.map((room) => (
                <ClassroomCard key={room.id} classroom={room} />
              ))}
            </Paper>
          </Grid>
          <Grid xs={6} sx={{ margin: 2 }}>
            <Paper sx={{ padding: 2, height: "85vh" }}>
              <Typography variant="h5">Modules</Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Name</TableCell>
                      <TableCell align="right">Format</TableCell>
                      <TableCell align="right">Size</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="right">{row.format}</TableCell>
                        <TableCell align="right">{row.fileSize}</TableCell>
                        <Button>Download</Button>
                        <Button color="error">Delete</Button>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid xs sx={{ margin: 2 }}>
            <Paper sx={{ padding: 2, height: "85vh" }}>
              <Typography variant="h5">Announcements</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TeacherHomePage;
