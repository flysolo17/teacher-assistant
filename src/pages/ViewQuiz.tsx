import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestore } from "../config/config";
import { Quiz, quizConverter } from "../model/Quiz";
import {
  Badge,
  Container,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
} from "@mui/material";

import { Button, Paper, TextField } from "@mui/material";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { quarters } from "../utils/Constants";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

import AddBoxIcon from "@mui/icons-material/AddBox";
import { AddBox } from "@mui/icons-material";
import { async } from "@firebase/util";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 3,
            paddingX: 20,
          }}
        >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
interface ViewQuizPageProps {}

const ViewQuizPage: React.FunctionComponent<ViewQuizPageProps> = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { id, quizID } = useParams();
  const [quiz, setQuiz] = React.useState<Quiz>();
  const [toggleOpen, setToggleOpen] = useState(quiz?.isOpen);
  const [toggleShowAnswer, setToggleShowAnswer] = useState(quiz?.showResult);
  const updateIsOpen = async () => {
    if (id !== undefined && quizID !== undefined) {
      const docRef = doc(firestore, "Classroom", id, "Quiz", quizID);
      await updateDoc(docRef, {
        isOpen: quiz?.isOpen ? false : true,
      });
    }
  };
  const updateShowResult = async () => {
    if (id !== undefined && quizID !== undefined) {
      const docRef = doc(firestore, "Classroom", id, "Quiz", quizID);
      await updateDoc(docRef, {
        showResult: quiz?.isOpen ? false : true,
      });
    }
  };
  React.useEffect(() => {
    if (id !== undefined && quizID !== undefined) {
      const docRef = doc(
        firestore,
        "Classroom",
        id,
        "Quiz",
        quizID
      ).withConverter(quizConverter);
      const unsub = onSnapshot(docRef, (snapshot) => {
        if (snapshot.exists()) {
          setQuiz(snapshot.data());
          setToggleOpen(snapshot.data().isOpen);
          setToggleShowAnswer(snapshot.data().showResult);
        }
      });
      return () => unsub();
    }
  }, []);
  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h3" gutterBottom>
          {quiz?.name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {quiz?.desc}
        </Typography>
      </Box>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Questions" {...a11yProps(0)} />

          <Tab
            label={
              <Badge
                badgeContent={quiz?.students.length}
                color="secondary"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                Responses
              </Badge>
            }
            {...a11yProps(1)}
          />
          <Tab label="Settings" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {quiz?.questions.map((question, index) => (
          <Stack
            direction={"column"}
            spacing={1}
            key={index}
            sx={{
              marginY: 2,
              backgroundColor: "white",
              flexGrow: 1,
              padding: 3,
              borderRadius: 2,
            }}
          >
            <Typography>Question {index + 1}</Typography>

            <TextField
              label="Question"
              placeholder="Write Question here"
              multiline
              name={"name"}
              value={question.name}
            />

            {question.choices.map((value, i) => (
              <Stack key={i} direction={"row"}>
                <TextField
                  label="Choice"
                  fullWidth
                  placeholder="Write Choices here"
                  name={"choices"}
                  value={value}
                  variant="standard"
                />
              </Stack>
            ))}

            <TextField
              label="Answer"
              fullWidth={false}
              placeholder="Write Anwer here"
              name={"answer"}
              value={question.answer}
              sx={{ width: "40%" }}
              variant="standard"
            />
          </Stack>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Responses is working!
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Paper
          sx={{
            padding: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {toggleOpen !== undefined && (
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  onClick={updateIsOpen}
                  defaultChecked={toggleOpen}
                />
              }
              label={
                <Typography
                  sx={{
                    margin: 1,
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: 24,
                    fontStyle: "normal",
                  }}
                >
                  Open Quiz
                </Typography>
              }
              labelPlacement="start"
            />
          )}
          <Divider />
          {toggleShowAnswer !== undefined && (
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  onClick={updateShowResult}
                  defaultChecked={toggleShowAnswer}
                />
              }
              label={
                <Typography
                  sx={{
                    margin: 1,
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: 24,
                    fontStyle: "normal",
                  }}
                >
                  Show Result
                </Typography>
              }
              labelPlacement="start"
            />
          )}
        </Paper>
      </TabPanel>
    </Box>
  );
};

export default ViewQuizPage;
