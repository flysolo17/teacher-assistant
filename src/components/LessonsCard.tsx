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
import { getFileColor, getFileType } from "../utils/Constants";
interface LessonsCardProps {
  lesson: Lesson;
}

const LessonsCard: React.FunctionComponent<LessonsCardProps> = (props) => {
  const { lesson } = props;
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
      <Box
        sx={{
          width: "95%",
          backgroundColor: "white",
          borderRadius: 2,
          margin: 2,
        }}
      >
        <Stack
          sx={{
            borderRadius: 2,
            padding: 2,
            backgroundColor: getFileColor(lesson.type),
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          direction={"row"}
          spacing={2}
        >
          <img src={getFileType(lesson.type)} width={"80px"} height={"80px"} />
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
            {lesson.name}
          </Typography>
          <Stack direction={"column"}>
            <IconButton onClick={() => downloadPdf()}>
              <FileDownloadIcon />
            </IconButton>
            <Typography>{formatBytes(lesson.size)}</Typography>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default LessonsCard;
