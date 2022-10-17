import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { firestore } from "../config/config";
import { doc, getDoc } from "firebase/firestore";
import { userConverter, Users } from "../model/User";
import { useNavigate } from "react-router-dom";
import TeacherHomePage from "./TeacherHome";
import StudentHomePage from "./StudentHomePage";
import { CircularProgress } from "@mui/material";
interface MainPageProps {}

const MainPage: React.FunctionComponent<MainPageProps> = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const [user, setUser] = useState<Users>();
  async function getAccount() {
    const docRef = doc(firestore, "Users", currentUser?.uid!).withConverter(
      userConverter
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUser(docSnap.data());
    }
  }
  useEffect(() => {
    getAccount();
  }, [user]);

  if (loading) return <CircularProgress />;
  return (
    <>{user?.type == "Teacher" ? <TeacherHomePage /> : <StudentHomePage />}</>
  );
};

export default MainPage;
