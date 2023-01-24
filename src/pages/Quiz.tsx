import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Divider,
  List,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { firestore } from "../config/config";
import { useAuth } from "../context/AuthContext";
import QuizCard from "../components/QuizCard";

interface QuizPageProps {}

const QuizPage: React.FunctionComponent<QuizPageProps> = () => {
  const [quiz, setQuiz] = useState<any[]>([]);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser !== null) {
      const reference = collection(firestore, "Quiz");
      const quizQuery = query(reference, orderBy("createdAt", "desc"));
      const unsub = onSnapshot(quizQuery, (snapshot) => {
        let data: any[] = [];
        snapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setQuiz(data);
        console.log("quiz");
      });
      return () => unsub();
    }
  }, []);
  const navigateToCreateQuiz = () => {
    navigate("create-quiz");
  };
  const navigateToViewQuiz = (id: string) => {
    navigate("view-quiz/" + id);
  };
  return (
    <Container>
      <Stack
        direction={"row"}
        sx={{ padding: "1rem", justifyContent: "space-between" }}
      >
        <Typography component={"h2"} variant={"h5"} sx={{ margin: 2 }}>
          Pagsusulit
        </Typography>

        <Button
          color={"success"}
          variant={"contained"}
          onClick={navigateToCreateQuiz}
        >
          Gumawa ng pagsusulit
        </Button>
      </Stack>
      <Divider />
      <List sx={{ width: "100%", height: "100%", overflow: "auto" }}>
        {quiz.map((data) => (
          <QuizCard
            quiz={data}
            key={data.id}
            clickQuiz={() => navigateToViewQuiz(data.id)}
          />
        ))}
      </List>
    </Container>
  );
};

export default QuizPage;
