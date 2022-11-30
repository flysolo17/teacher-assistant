import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Button } from "@mui/material";
import { Quiz } from "../model/Quiz";
import { getScore } from "../utils/Constants";
interface StudentQuizCardProps {
  quiz: Quiz;
  myID: string;
  takeQuiz: () => void;
  viewResult: () => void;
}

const StudentQuizCard: React.FunctionComponent<StudentQuizCardProps> = (
  props
) => {
  const { quiz, takeQuiz, viewResult, myID } = props;
  const theme = useTheme();
  function getData(myID: string) {
    if (quiz.isOpen) {
      const result = quiz.students.filter(
        (data) => data.studentID == myID
      ).length;
      if (result == 0) {
        return (
          <Button variant={"outlined"} color={"error"} onClick={takeQuiz}>
            Take Quiz
          </Button>
        );
      } else if (quiz.showResult) {
        return (
          <Button color={"success"} variant={"outlined"} onClick={viewResult}>
            View Result
          </Button>
        );
      }
    }
    return undefined;
  }
  function isTaken(myID: string): string {
    let bool = "#f44336";
    if (quiz.isOpen) {
      const result = quiz.students.filter(
        (data) => data.studentID == myID
      ).length;
      if (result == 0) {
        bool = "#f44336";
      } else {
        bool = "#00c000";
      }
    }
    return bool;
  }

  return (
    <Card
      sx={{
        display: "flex",
        borderRight: 5,
        margin: 2,
        borderColor: isTaken(myID),
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
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
            {quiz.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {quiz.desc}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pl: 1,
            flexGrow: 1,
            pb: 1,
            justifyContent: "space-between",
          }}
        >
          {getData(myID)}
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: " #070707",
              marginX: 5,
              fontFamily: "Poppins",
              fontStyle: "regular",
              fontWeight: 400,
            }}
          >
            {getScore(quiz, myID)}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default StudentQuizCard;
