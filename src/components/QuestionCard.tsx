import { QuestionMarkSharp } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Questions } from "../model/Questions";

interface QuestionCardProps {
  question: Questions;
  index: number;
  answer: (answer: string, index: number) => void;
}

const QuestionCard: React.FunctionComponent<QuestionCardProps> = (props) => {
  const { question, index, answer } = props;
  const [textFieldAnswer, setTextFieldAnswer] = useState("");
  answer("", index);
  const textAns = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTextFieldAnswer(e.target.value);
  };
  useEffect(() => {
    answer(textFieldAnswer, index);
  }, [textFieldAnswer]);
  return (
    <Stack
      sx={{
        padding: 5,
        marginX: 10,
        borderRadius: 3,
        textAlign: "left",
      }}
      spacing={2}
      direction="column"
    >
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontWeight: 700,
          fontSize: 30,
          textStyle: "normal",
        }}
      >
        {index + 1}. {question.name}
      </Typography>
      {question.choices.length > 0 ? (
        <FormControl sx={{ marginX: 3 }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            onChange={(e) => answer(e.target.value, index)}
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
        <TextField
          label={"Answer"}
          value={textFieldAnswer}
          onChange={(e) => textAns(e)}
        />
      )}
    </Stack>
  );
};

export default QuestionCard;
