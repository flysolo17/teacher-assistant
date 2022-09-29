import {
  Button,
  CardContent,
  Typography,
  CardActions,
  Card,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Classroom } from "../model/Classroom";
interface ClassroomCardProps {
  classroom: Classroom;
}

const ClassroomCard: React.FunctionComponent<ClassroomCardProps> = (props) => {
  const { classroom } = props;
  return (
    <>
      <Card sx={{ minWidth: 250, margin: 1 }}>
        <CardContent>
          <Typography variant={"h5"} color="text.secondary" gutterBottom>
            {classroom.section}
          </Typography>
          <Typography sx={{ fontSize: 14 }} component="div">
            {classroom.students.length} Students
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
        </CardContent>
        <CardActions>
          <Button size="small" startIcon={<Delete />} color="error">
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ClassroomCard;
