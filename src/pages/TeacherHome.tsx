import { Box, LinearProgress } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
interface TeacherHomePageProps {}

const TeacherHomePage: React.FunctionComponent<TeacherHomePageProps> = (
  props
) => {
  const [classrooms, setClassroom] = useState<any[]>([]);
  const firestore = getFirestore();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getAllMyClassroom(auth.currentUser?.uid!);
  }, [classrooms]);

  async function getAllMyClassroom(userId: string) {
    if (userId != null) {
      setLoading(true);
      const q = query(
        collection(firestore, "Classroom"),
        where("teacher", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      let data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setLoading(false);
      setClassroom(data);
    }
  }
  if (loading) return <LinearProgress />;
  return (
    <>
      <div>{!loading && <ClassRoomPage userId={auth.currentUser?.uid!} />}</div>
    </>
  );
};

export default TeacherHomePage;
