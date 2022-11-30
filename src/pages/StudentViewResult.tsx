import { Box } from "@mui/material";

interface StudentViewResultPageProps {}

const StudentViewResultPage: React.FunctionComponent<
  StudentViewResultPageProps
> = () => {
  return (
    <Box
      sx={{
        width: "100%",

        height: "100vh",
      }}
    >
      <h1>View Result is working!</h1>
    </Box>
  );
};

export default StudentViewResultPage;
