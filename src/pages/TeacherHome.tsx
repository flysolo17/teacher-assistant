import { Alert, Divider, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import {
  collection,
  onSnapshot,
  orderBy,
  Query,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import ClassCard from "../components/ClassCard";
import CreateClassDialog from "../components/CreateClass";
import { firestore } from "../config/config";
import { useAuth } from "../context/AuthContext";
import teaching from "../images/teaching.png";
import { useNavigate } from "react-router-dom";
import {  getImage } from "../utils/Constants";

interface TeacherHomePageProps {}

const TeacherHomePage: React.FunctionComponent<TeacherHomePageProps> = () => {
  const { currentUser } = useAuth();
  const [classroom, setClassroom] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser != null) {
      const reference = collection(firestore, "Classroom");
      const classroomQuery = query(
        reference,
        where("teacher", "==", currentUser.uid),
        orderBy("createdAt", "desc")
      );
      const unsubscribe = onSnapshot(classroomQuery, (snapshot) => {
        let data: any[] = [];
        snapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setClassroom(data);
        console.log(data);
      });
      return () => unsubscribe();
    }
  }, []);

  return (
    <>
      <div className="teacher-homepage">
        <div className="header">
          <p className="name">My Classes</p>
        </div>

        <Divider />
        <Stack
          sx={{
            width: "100%",
            display: "flex-end",
            justifyContent: "end",
            alignItems: "end",
          }}
        >
          {currentUser != null && (
            <CreateClassDialog userId={currentUser?.uid} />
          )}
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 16 }}
          >
            {classroom.length > 0 ? (
              classroom.map((row) => (
                <Grid item xs={2} sm={4} md={4}>
                  <ClassCard
                    key={row.id}
                    classroom={row}
                    onClick={() => navigate("/classroom/" + row.id)}
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
      </div>
    </>
  );
};

export default TeacherHomePage;
