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
import { Questions } from "../model/Questions";

interface TeacherQuestionCardProps {
  question: Questions;
}

const TeacherQuestionCard: React.FunctionComponent<TeacherQuestionCardProps> = (
  props
) => {
  const { question } = props;
  return (
    <Paper
      sx={{
        borderRadius: 5,
        padding: 3,
        margin: 1,
      }}
    >
      <Stack sx={{ width: "100%" }} direction={"column"} spacing={2}>
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
        {question.choices.length > 0 ? (
          <FormControl sx={{ marginX: 3 }}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              defaultValue={question.answer}
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
          <TextField label={"Answer"} value={question.answer} />
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

export default TeacherQuestionCard;
