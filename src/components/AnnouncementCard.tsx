import { Announcement } from "../model/Announcement";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { formatDate1 } from "../utils/Constants";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../config/config";
import { Link } from "react-router-dom";
interface AnnouncementCardProps {
  announcement: Announcement;
}

const AnnouncementCard: React.FunctionComponent<AnnouncementCardProps> = (
  props
) => {
  const { announcement } = props;
  const deleteAnnouncement = (id: string) => {
    deleteDoc(doc(firestore, "Announcements", id))
      .then(() => {
        alert("Tagumpay ang pagdedelete ng anunsyo");
      })
      .catch((err) => alert(err.message));
  };
  return (
    <Card sx={{ width: "100%" }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {announcement.message}
          </Typography>

          {announcement.link != "" && (
            <Button
              variant="outlined"
              href={announcement.link}
              sx={{ marginBottom: 1 }}
            >
              Bisitahin
            </Button>
          )}

          <Typography variant="body1" color="text.primary">
            {formatDate1(announcement.date)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="error"
            onClick={() => deleteAnnouncement(announcement.id)}
          >
            IDelete
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default AnnouncementCard;
