import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { firestore } from "../config/config";
import { doc, getDoc } from "firebase/firestore";
import { userConverter, Users } from "../model/User";
import { useNavigate } from "react-router-dom";
import TeacherHomePage from "./TeacherHome";
import StudentHomePage from "./StudentHomePage";
import { CircularProgress, Container } from "@mui/material";
interface MainPageProps {}

const MainPage: React.FunctionComponent<MainPageProps> = (props) => {
  const { currentUser, loading } = useAuth();
  const [user, setUser] = useState<Users | null>(null);

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
    if (currentUser != null) {
      getAccount();
    }
  }, [currentUser]);

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
    <>
      {!loading &&
        user != null &&
        (user.type == "Teacher" ? <TeacherHomePage /> : <StudentHomePage />)}
    </>
  );
};

export default MainPage;
