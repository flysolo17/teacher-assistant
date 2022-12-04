import { Quiz } from "@mui/icons-material";
import {
  TextField,
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Questions } from "../model/Questions";

interface StudentViewQuizProps {
  question: Questions;
  myAnswer: string;
}

const StudentViewQuiz: React.FunctionComponent<StudentViewQuizProps> = (
  props
) => {
  const { question, myAnswer } = props;
  const [color, setColor] = useState("");
  const getColor = (question: string, myAns: string) => {
    if (question == myAns) {
      setColor("#00c000");
    } else {
      setColor("#f44336");
    }
  };
  useEffect(() => {
    getColor(question.answer, myAnswer);
  }, []);
  return (
    <Paper
      sx={{
        borderRadius: 5,
        padding: 3,
        margin: 1,
        borderLeft: 5,
        borderColor: color,
      }}
    >
      <Stack sx={{ width: "100%" }} direction={"column"} spacing={3}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 700,
              fontStyle: "normal",
              fontSize: 24,
            }}
          >
            {question.name}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 700,
              fontStyle: "normal",
              fontSize: 24,
            }}
          >
            {question.answer == myAnswer ? 1 : 0}
          </Typography>
        </Box>

        {question.choices.length > 0 ? (
          <FormControl sx={{ marginX: 3 }}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={myAnswer}
            >
              {question.choices.map((data, index) => (
                <FormControlLabel
                  value={data}
                  key={index}
                  control={<Radio />}
                  label={
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: 400,
                        fontSize: 20,
                        textStyle: "normal",
                      }}
                    >
                      {data}
                    </Typography>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
        ) : (
          <TextField label={"Answer"} value={myAnswer} size={"small"} />
        )}
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: 24,
          }}
          color={"error"}
        >
          Answer: {question.answer}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default StudentViewQuiz;
