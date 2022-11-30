import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Button } from "@mui/material";
import { Quiz } from "../model/Quiz";
import { getScore } from "../utils/Constants";
interface ViewQuizCardProps {
  quiz: Quiz;
}

const ViewQuizCard: React.FunctionComponent<ViewQuizCardProps> = (props) => {
  const { quiz } = props;
  return <Box sx={{ borderRadius: 5, padding: 2 }}></Box>;
};

export default ViewQuizCard;
