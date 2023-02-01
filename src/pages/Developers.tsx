import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { developers } from "../utils/Constants";
import { Avatar, Stack, Typography } from "@mui/material";

interface DevelopersPageProps {}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const DevelopersPage: React.FunctionComponent<DevelopersPageProps> = (
  props
) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "1rem",
      }}
    >
      <Typography
        variant={"h5"}
        component={"h1"}
        padding={5}
        sx={{
          color: " #070707",
          fontFamily: "Poppins",
          fontStyle: "regular",
          fontWeight: 400,
          fontSize: 50,
        }}
      >
        Aming Grupo
      </Typography>
      <Grid
        sx={{
          alignItems: "center",
        }}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {developers.map((data, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Stack
              direction={"row"}
              spacing={2}
              sx={{
                margin: 1,
                padding: 2,
                borderRadius: 5,
                backgroundColor: "#DEE1F0",
              }}
            >
              <Avatar
                sx={{ width: 80, height: 80 }}
                src={data.image}
                alt={"profile"}
              />
              <div>
                <h3>{data.name}</h3>
                <h5>{data.title}</h5>
                <p>{data.role}</p>
              </div>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DevelopersPage;
