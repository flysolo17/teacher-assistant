import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Classroom } from "../model/Classroom";
import { Grid } from "@mui/material";
interface ClassCardProps {
  classroom: Classroom;
  onClick : () => void
}

const ClassCard: React.FunctionComponent<ClassCardProps> = (props) => {
  const { classroom ,onClick} = props;
  return (
    <Grid item xs={2} sm={4} md={4} onClick={onClick}>
      <Card sx={{ display: "flex", backgroundColor: classroom.color }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h6">
              {classroom.className}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Grid>
  );
};

export default ClassCard;
