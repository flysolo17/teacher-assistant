import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Classroom } from "../model/Classroom";
import { Container, Grid } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

import { CardActionArea } from "@mui/material";
import { getColor, getImage } from "../utils/Constants";
interface ClassCardProps {
  classroom: Classroom;
  onClick: () => void;
}

const ClassCard: React.FunctionComponent<ClassCardProps> = (props) => {
  const { classroom, onClick } = props;
  function formatTimestamp(timestamp: number) {
    const current_datetime = new Date(timestamp);
    return current_datetime.toLocaleString();
  }
  return (
    <Container onClick={onClick} sx={{ borderRadius: 10 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height={"190"}
          image={getImage(classroom.color)}
          sx={{ borderRadius: 2 }}
          alt="green iguana"
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
              color: "black",
            }}
          >
            {classroom.className}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatTimestamp(classroom.createdAt)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Container>
  );
};

export default ClassCard;
