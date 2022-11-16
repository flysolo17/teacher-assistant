import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  List,
  Stack,
  Typography,
} from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassCard from "../components/ClassCard";
import InvitationCard from "../components/InvitationCard";
import StudentClassCard from "../components/StudentClassCard";
import { firestore } from "../config/config";
import { useAuth } from "../context/AuthContext";
import teaching from "../images/teaching.png";
import { Invitation } from "../model/Invitation";
import { userConverter, Users } from "../model/User";
export interface IStudentHomePageProps {}

const StudentHomePage: React.FunctionComponent<IStudentHomePageProps> = (
  props
) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [classroom, setClassroom] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [invitations, setInvitations] = useState<any[]>([]);
  useEffect(() => {
    if (currentUser != null) {
      setLoading(true);
      const reference = collection(firestore, "Invitations");
      const invitationQuery = query(
        reference,
        where("studentID", "==", currentUser.uid),
        orderBy("date", "desc")
      );
      const unsubscribe = onSnapshot(invitationQuery, (snapshot) => {
        let data: any[] = [];
        snapshot.forEach((document) => {
          let id = document.data()["teacher"];
          if (id != undefined) {
            const teach = doc(firestore, "Users", id).withConverter(
              userConverter
            );
            getDoc(teach)
              .then((user) => {
                data.push({
                  ...document.data(),
                  id: document.id,
                  teacher: user.data(),
                });
                console.log(data);
              })
              .catch((error) => {
                console.log(error);
              })
              .finally(() => {
                setLoading(false);
                setInvitations(data);
              });
          }
        });
      });

      return () => unsubscribe();
    }
  }, []);
  useEffect(() => {
    if (currentUser != null) {
      setLoading(true);
      const reference = collection(firestore, "Classroom");
      const classroomQuery = query(
        reference,
        where("students", "array-contains", currentUser.uid)
      );
      const unsubscribe = onSnapshot(classroomQuery, (snapshot) => {
        let data: any[] = [];
        snapshot.forEach((document) => {
          let id = document.data()["teacher"];
          console.log(id);
          if (id != undefined) {
            const teach = doc(firestore, "Users", id).withConverter(
              userConverter
            );
            getDoc(teach)
              .then((user) => {
                data.push({
                  ...document.data(),
                  id: document.id,
                  teacher: user.data(),
                });
                console.log(data);
              })
              .catch((error) => {
                console.log(error);
              })
              .finally(() => {
                setLoading(false);
                setClassroom(data);
                console.log(data);
              });
          }
        });
      });
      setLoading(false);
      return () => unsubscribe();
    }
  }, []);

  if (loading) {
    return (
      <>
        <Container
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Container>
      </>
    );
  }
  return (
    <Box sx={{ width: "100%", padding: 4 }}>
      <div className="header">
        <p className="name">My Classes</p>
      </div>
      <Divider />
      <Stack sx={{ width: "100%" }} direction={"row"}>
        <Stack sx={{ width: "80%", marginTop: 2 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {classroom.length > 0 ? (
              classroom.map((row) => (
                <Grid item xs={2} sm={4} md={4}>
                  <StudentClassCard
                    key={row.id}
                    classroom={row}
                    teacher={row.teacher}
                    classID={row.id}
                  />
                </Grid>
              ))
            ) : (
              <Stack sx={{ margin: "auto" }}>
                <img src={teaching} alt="teaching" />
                <Typography
                  component="div"
                  variant="h6"
                  sx={{ margin: "auto" }}
                >
                  No Classrooms yet!
                </Typography>
              </Stack>
            )}
          </Grid>
        </Stack>
        <Stack sx={{ width: "20%", marginTop: 2 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: " #070707",
              fontFamily: "Poppins",
              fontStyle: "regular",
              fontWeight: 400,
            }}
          >
            Invitations
          </Typography>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {invitations.map((row) => (
              <InvitationCard
                key={row.id}
                invitations={row}
                teacher={row.teacher}
                id={row.id}
              />
            ))}
          </List>
        </Stack>
      </Stack>
    </Box>
  );
};

export default StudentHomePage;
