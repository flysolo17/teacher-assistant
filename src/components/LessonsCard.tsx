import { Button, CardActions, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Lesson } from "../model/Lesson";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";

import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PdfImage from "../images/pdfimage.png";
import { storage } from "../config/config";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { getDownloadURL, ref } from "firebase/storage";
import { usePDF, Document, Page } from "@react-pdf/renderer";
interface LessonsCardProps {
  lesson: Lesson;
  lessonsID: string;
}

const LessonsCard: React.FunctionComponent<LessonsCardProps> = (props) => {
  const { lesson, lessonsID } = props;
  const theme = useTheme();
  function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }
  function downloadPdf() {
    // using Java Script method to get PDF file
    fetch(lesson.url).then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = lesson.name;
        alink.click();
      });
    });
  }

  return (
    <>
      <Card sx={{ display: "flex", backgroundColor: "#FFC4AD", height: 200 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="h2" variant="h6">
              {lesson.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="h2"
            >
              {formatBytes(lesson.size)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => downloadPdf()}>Download</Button>
          </CardActions>
        </Box>
      </Card>
    </>
  );
};

export default LessonsCard;
