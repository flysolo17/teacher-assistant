import { async } from "@firebase/util";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import StudentViewQuiz from "../components/StudentViewQuiz";
import ViewQuizCard from "../components/ViewQuizCard";
import { firestore } from "../config/config";
import { useAuth } from "../context/AuthContext";
import { Quiz, quizConverter } from "../model/Quiz";
import { getScore, getStudent } from "../utils/Constants";

interface StudentViewResultPageProps {}

const StudentViewResultPage: React.FunctionComponent<
  StudentViewResultPageProps
> = () => {
  const { id, quizID } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const getQuiz = (id: string, quizID: string) => {
    setLoading(true);
    const docRef = doc(
      firestore,
      "Classroom",
      id,
      "Quiz",
      quizID
    ).withConverter(quizConverter);
    getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          let quiz: Quiz = snapshot.data();
          setQuiz(quiz);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (id !== undefined && quizID !== undefined) {
      getQuiz(id, quizID);
    }
  }, []);
  if (loading)
    return (
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
    );
  return (
    <Stack
      sx={{
        width: "70%",
        padding: 2,
        margin: "auto",
      }}
      spacing={5}
      direction={"column"}
    >
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontWeight: 400,
          textAlign: "center",
          fontSize: 36,
          textStyle: "normal",
        }}
      >
        {quiz?.name}
      </Typography>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontWeight: 400,
          textAlign: "center",
          fontSize: 20,
          textStyle: "normal",
        }}
      >
        {quiz?.desc}
      </Typography>
      {quiz != null && (
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: 700,

            fontSize: 24,
            textStyle: "normal",
          }}
        >
          Score: {getScore(quiz, currentUser?.uid!)}
        </Typography>
      )}
      {quiz?.questions.map((data, index) => (
        <StudentViewQuiz
          question={data}
          key={index}
          myAnswer={getStudent(quiz, currentUser?.uid!).answers[index]}
        />
      ))}
    </Stack>
  );
};

export default StudentViewResultPage;
