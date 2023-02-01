import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Student } from "../model/Student";
import { userConverter, Users } from "../model/User";
import { getScore, responsesScores } from "../utils/Constants";
import { Divider } from "@mui/material";
import { Quiz } from "../model/Quiz";
import { doc, Firestore, getDoc } from "firebase/firestore";
import { firestore } from "../config/config";

interface ResponsesProps {
  student: Student;
  index: number;
  quiz: Quiz;
}

const Responses: React.FunctionComponent<ResponsesProps> = (props) => {
  const { student, index, quiz } = props;
  const [user, setUser] = React.useState<Users | null>(null);
  function getStudentInfo(params: string) {
    const docRef = doc(firestore, "Users", params).withConverter(userConverter);
    getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          let user: Users = snapshot.data();
          setUser(user);
        }
      })
      .catch((err) => {})
      .finally(() => {});
  }
  const fullname =
    user?.firstName + " " + user?.middleName + " " + user?.lastName;
  React.useEffect(() => {
    getStudentInfo(student.studentID);
  }, []);
  return (
    <div>
      <ListItem
        key={index}
        secondaryAction={
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: 24,
            }}
          >
            {responsesScores(quiz, student)}
          </Typography>
        }
        disablePadding
      >
        <ListItemButton>
          <ListItemAvatar>
            {user != null && (
              <Avatar
                sx={{ width: 60, height: 60, margin: 1 }}
                src={user.profile[user.profile.length - 1]}
                alt={"profile"}
              />
            )}
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: 24,
                }}
              >
                {fullname}
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider />
    </div>
  );
};

export default Responses;
