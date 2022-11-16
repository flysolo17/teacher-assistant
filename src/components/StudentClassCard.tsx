import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Classroom } from "../model/Classroom";
import { Avatar, Container } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

import { CardActionArea } from "@mui/material";
import { formatTimestamp, getImage } from "../utils/Constants";
import Class01 from "../images/class01.jpg";
import { Users } from "../model/User";
import { useNavigate } from "react-router-dom";
interface StudentClassCardProps {
  classroom: Classroom;
  teacher: Users;
  classID: string;
}

const StudentClassCard: React.FunctionComponent<StudentClassCardProps> = (
  props
) => {
  const { classroom, teacher, classID } = props;
  const navigate = useNavigate();
  const navigateToClassroom = () => {
    navigate("classroom/student/" + classID);
  };
  return (
    <>
      <Container sx={{ borderRadius: 10 }} onClick={navigateToClassroom}>
        <CardActionArea>
          <CardMedia
            component="img"
            height={"190"}
            image={getImage(classroom.color)}
            sx={{ borderRadius: 2 }}
            alt="background"
          />

          <Avatar
            src={teacher?.profile[teacher.profile.length - 1]}
            sx={{
              position: "absolute",
              width: 100,
              height: 100,
              border: 3,
              borderColor: "white",
              bottom: 110,
              left: 10,
            }}
          />

          <CardContent>
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
              {classroom.className}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                color: " #070707",
                fontWeight: 400,
              }}
            >
              {formatTimestamp(classroom.createdAt)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Container>
    </>
  );
};

export default StudentClassCard;
