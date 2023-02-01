import { Announcement } from "../model/Announcement";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { formatDate1 } from "../utils/Constants";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../config/config";
interface StudentAnnouncementCardProps {
  announcement: Announcement;
}

const StudentAnnouncementCard: React.FunctionComponent<
  StudentAnnouncementCardProps
> = (props) => {
  const { announcement } = props;
  return (
    <Card sx={{ width: "100%", margin: "10px" }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {announcement.message}
          </Typography>
          <Typography variant="body1" color="text.primary">
            {formatDate1(announcement.date)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            href={announcement.link}
            sx={{ marginBottom: 1 }}
          >
            Bisitahin
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default StudentAnnouncementCard;
