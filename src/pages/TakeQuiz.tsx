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
import { firestore } from "../config/config";
import { useAuth } from "../context/AuthContext";
import { Quiz, quizConverter } from "../model/Quiz";

interface TakeQuizPageProps {}

const TakeQuizPage: React.FunctionComponent<TakeQuizPageProps> = () => {
  const { id, quizID } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  var listAnswers: any[] = [];
  const navigate = useNavigate();
  const onAnswerChange = (answer: string, index: number) => {
    listAnswers[index] = answer;
  };
  const onSubmit = () => {
    if (id !== undefined && quizID !== undefined) {
      const docRef = doc(firestore, "Classroom", id, "Quiz", quizID);
      const myAnswer = {
        studentID: currentUser?.uid,
        answers: listAnswers,
        takenAt: new Date().getTime() / 1000,
      };
      updateDoc(docRef, {
        students: arrayUnion(myAnswer),
      })
        .then(() => {
          console.log("Success");
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          navigate(-1);
        });
    } else {
      console.log("error");
    }
  };
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
        textAlign: "center",
      }}
      direction={"column"}
    >
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontWeight: 400,
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
          fontSize: 20,
          textStyle: "normal",
        }}
      >
        {quiz?.desc}
      </Typography>

      {quiz?.questions.map((data, index) => (
        <QuestionCard
          question={data}
          key={index}
          index={index}
          answer={onAnswerChange}
        />
      ))}
      <Stack
        direction={"row"}
        sx={{
          display: "flex",
          alignItems: "right",
          justifyContent: "right",
          margin: 2,
          padding: 2,
        }}
        spacing={2}
      >
        <Button color="error" size="large" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default TakeQuizPage;
