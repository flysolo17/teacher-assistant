import { Alert, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import ClassCard from "../components/ClassCard";
import CreateClassDialog from "../components/CreateClass";
import { firestore } from "../config/config";
import { useAuth } from "../context/AuthContext";
import teaching from "../images/teaching.png";
import { useNavigate } from "react-router-dom";

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
        where("teacher", "==", currentUser.uid)
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
          <Typography variant="h5">My Classes</Typography>
          {currentUser != null && (
            <CreateClassDialog userId={currentUser?.uid} />
          )}
        </div>

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {classroom.length > 0 ? (
            classroom.map((row) => (
              <ClassCard
                key={row.id}
                classroom={row}
                onClick={() => navigate("/classroom/" + row.id)}
              />
            ))
          ) : (
            <Stack sx={{ margin: "auto" }}>
              <img src={teaching} alt="teaching" />
              <Typography component="div" variant="h6" sx={{ margin: "auto" }}>
                No Classrooms yet!
              </Typography>
            </Stack>
          )}
        </Grid>
      </div>
    </>
  );
};

export default TeacherHomePage;
