import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { quarters } from "../utils/Constants";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { addDoc, collection, doc } from "firebase/firestore";
import { firestore } from "../config/config";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { AddBox } from "@mui/icons-material";
interface CreateQuizPageProps {}

const CreateQuizPage: React.FunctionComponent<CreateQuizPageProps> = () => {
  const { currentUser } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    {
      name: "",
      choices: [],
      answer: "",
    },
  ]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const handleNewQuestion = () => {
    setQuestions([...questions, { name: "", choices: [], answer: "" }]);
  };
  const handleNewChoice = (index: number) => {
    let values = [...questions] as any;
    values[index]["choices"].push("");
    setQuestions(values);
  };
  const handleChoiceChange = (
    index: number,
    parentIndex: number,
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    let values = [...questions] as any;
    values[parentIndex][event.target.name][index] = event.target.value;
    setQuestions(values);
  };
  const handleOnQuestionChange = (
    index: number,
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    let values = [...questions] as any;
    values[index][event.target.name] = event.target.value;
    setQuestions(values);
  };
  const handleDeleteQuestion = (
    index: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    let value = [...questions];
    if (index > -1) {
      value.splice(index, 1);
    }
    setQuestions(value);
  };
  const handdlePopAnswer = (index: number) => {
    let values = [...questions];
    values[index].choices.pop();
    setQuestions(values);
  };
  const [quarter, setQuarter] = useState("1");
  const handdleQuarterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuarter(event.target.value);
  };
  const handdleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (id !== undefined) {
      try {
        const docRef = await addDoc(
          collection(firestore, "Classroom", id!, "Quiz"),
          {
            name: name,
            desc: desc,
            questions: questions,
            students: [],
            quarter: parseInt(quarter),
            isOpen: true,
            showResult: false,
            createdAt: new Date().getTime() / 1000,
          }
        );
        navigate(-1);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        flexDirection: "column",
        backgroundColor: "#E6FBC7",
        minHeight: "100vh",
      }}
    >
      <Stack
        sx={{
          width: "70%",
        }}
        spacing={2}
        direction={"row"}
      >
        <Container sx={{ flexGrow: 1, padding: 2 }}>
          <Stack sx={{ width: "100%" }} direction={"column"}>
            <Paper
              elevation={2}
              sx={{
                width: "100%",
                borderRadius: 2,
                padding: 3,
                borderLeftColor: "#101828",
                borderLeft: 5,
              }}
            >
              <Stack
                direction={"column"}
                spacing={2}
                sx={{
                  backgroundColor: "white",
                }}
              >
                <TextField
                  label="Quiz Title"
                  placeholder="Write title here"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  id="outlined-textarea"
                  label="Description"
                  placeholder="Write something here"
                  multiline
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows={4}
                />
                <TextField
                  id="outlined-select-quater-native"
                  select
                  sx={{
                    marginY: 2,
                  }}
                  label="Select Quarter"
                  value={quarter}
                  onChange={handdleQuarterChange}
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Please select quarter"
                >
                  {quarters.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Stack>
            </Paper>
            {questions.map((question, index) => (
              <Stack
                direction={"column"}
                spacing={1}
                key={index}
                sx={{
                  marginY: 2,
                  backgroundColor: "white",
                  width: "100%",
                  padding: 3,
                  borderRadius: 2,
                }}
              >
                <Stack
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  direction="row"
                >
                  <Typography>Question {index + 1}</Typography>
                  <IconButton
                    aria-label="delete"
                    color={"error"}
                    onClick={(e) => handleDeleteQuestion(index, e)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>

                <TextField
                  label="Question"
                  placeholder="Write Question here"
                  multiline
                  name={"name"}
                  value={question.name}
                  onChange={(e) => handleOnQuestionChange(index, e)}
                />

                {question.choices.map((value, i) => (
                  <Stack key={i} direction={"row"}>
                    <TextField
                      label="Choice"
                      fullWidth
                      placeholder="Write Choices here"
                      name={"choices"}
                      value={value}
                      onChange={(e) => handleChoiceChange(i, index, e)}
                      variant="standard"
                    />
                  </Stack>
                ))}
                <Stack
                  sx={{
                    display: "flex",
                    alignItems: "right",
                    justifyContent: "right",
                  }}
                  direction={"row"}
                  spacing={2}
                >
                  <IconButton
                    aria-label="delete"
                    onClick={() => handdlePopAnswer(index)}
                  >
                    <ClearIcon />
                  </IconButton>
                  <IconButton
                    aria-label="add"
                    onClick={(e) => handleNewChoice(index)}
                  >
                    <AddIcon />
                  </IconButton>
                </Stack>

                <TextField
                  label="Answer"
                  fullWidth={false}
                  placeholder="Write Anwer here"
                  name={"answer"}
                  value={question.answer}
                  onChange={(e) => handleOnQuestionChange(index, e)}
                  sx={{ width: "40%" }}
                  variant="standard"
                />
              </Stack>
            ))}
          </Stack>
        </Container>
        <Container
          sx={{
            width: "10%",
            height: 100,
            position: "sticky",
            top: 0,
          }}
        >
          <Paper
            elevation={2}
            sx={{
              padding: 1,
              right: 0,
              display: "flex",
              alignItem: "center",
              justifyContent: "start",
              flexDirection: "column",
              margin: 2,
              height: 100,
            }}
          >
            <IconButton onClick={handleNewQuestion} size={"large"}>
              <AddBox />
            </IconButton>
            <IconButton size={"large"} onClick={(e) => handdleSubmit(e)}>
              <SaveIcon />
            </IconButton>
          </Paper>
        </Container>
      </Stack>
    </Box>
  );
};

export default CreateQuizPage;
