import {
  DeleteOutline,
  Delete,
  DeleteOutlineRounded,
  EditOutlined,
} from "@mui/icons-material";
import {
  Stack,
  Paper,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { Classroom } from "../model/Classroom";
interface ClassroomCardProps {
  classroom: Classroom;
}

const ClassroomCard: React.FunctionComponent<ClassroomCardProps> = (props) => {
  const { classroom } = props;
  return (
    <Paper
      elevation={2}
      sx={{
        width: 400,
        padding: 1,
        borderRadius: 5,
        margin: "0 auto",
        backgroundColor: "#E4E7EC",
      }}
    >
      <Stack spacing={2}>
        <h1>Section</h1>
        <h3>{classroom.section}</h3>
      </Stack>
    </Paper>
  );
};

export default ClassroomCard;
