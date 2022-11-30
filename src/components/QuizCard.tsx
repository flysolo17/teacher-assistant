import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Quiz } from "../model/Quiz";
interface QuizCardProps {
  quiz: Quiz;
  clickQuiz: () => void;
}

const QuizCard: React.FunctionComponent<QuizCardProps> = (props) => {
  const { quiz, clickQuiz } = props;
  return (
    <>
      <ListItem alignItems="flex-start" onClick={clickQuiz}>
        <ListItemText
          primary={
            <Typography
              sx={{
                margin: 1,
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: 20,
                fontStyle: "bold",
              }}
            >
              {quiz.name}
            </Typography>
          }
          secondary={
            <>
              <Typography
                sx={{
                  margin: 1,
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  fontSize: 16,
                  fontStyle: "normal",
                }}
              >
                {quiz.desc}
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider />
    </>
  );
};

export default QuizCard;
