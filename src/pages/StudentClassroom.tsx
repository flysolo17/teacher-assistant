import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  List,
  ListSubheader,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { cpSync } from "fs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { firestore } from "../config/config";
import { Classroom, classroomConveter } from "../model/Classroom";
import { userConverter, Users } from "../model/User";
import nolessons from "../images/nolessons.png";
import LessonsCard from "../components/LessonsCard";
import { Quiz } from "../model/Quiz";
import QuizCard from "../components/QuizCard";
import StudentQuizCard from "../components/StudentQuizCard";
import { useAuth } from "../context/AuthContext";
import {
  computeUnAnsweredQuiz,
  currentAnnouncement,
  formatDate1,
  getLessonsPerQuarter,
  getLessonsQuarters,
  getQuarters,
} from "../utils/Constants";
import AnnouncementCard from "../components/AnnouncementCard";
import StudentAnnouncementCard from "../components/StudentAnnouncementCard";
import { ArrowBack } from "@mui/icons-material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
interface StudentClassroomPageProps {}

const StudentClassroomPage: React.FunctionComponent<
  StudentClassroomPageProps
> = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [classroom, setClassroom] = useState<Classroom>();
  const [teacher, setTeacher] = useState<Users>();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  async function getClassroomData() {
    const docRef = doc(firestore, "Classroom", id!).withConverter(
      classroomConveter
    );
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      let id = snap.data()["teacher"];
      setClassroom(snap.data());
      getTeacherData(id);
    }
  }
  const navigateToQuestions = (quizID: string) => {
    navigate("take-quiz/" + quizID);
  };
  const navigateToResult = (quizID: string) => {
    navigate("result/" + quizID);
  };
  async function getTeacherData(teacherID: string) {
    const docRef = doc(firestore, "Users", teacherID).withConverter(
      userConverter
    );
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      setTeacher(snap.data());
    }
  }
  useEffect(() => {
    if (id !== undefined) {
      const ref = collection(firestore, "Classroom", id, "Quiz");
      const q = query(ref, orderBy("createdAt", "desc"));
      const unsub = onSnapshot(q, (snapshot) => {
        let data: any = [];
        snapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setQuiz(data);
      });
      return () => unsub();
    }
  }, []);
  useEffect(() => {
    if (id !== undefined) {
      const ref = collection(firestore, "Announcements");
      const q = query(
        ref,
        where("classrooms", "array-contains", id),
        orderBy("date", "desc")
      );
      const unsub = onSnapshot(q, (snapshot) => {
        let data: any = [];
        snapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setAnnouncements(data);
        console.log("announce", data);
      });
      return () => unsub();
    }
  }, []);

  function getQuizPerQuarter(quarter: number): any[] {
    return quiz.filter((data) => data.quarter == quarter);
  }
  useEffect(() => {
    getClassroomData();
  }, []);
  if (loading)
    return (
      <Container
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItem: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Container>
    );
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100vh",
      }}
      direction={"row"}
    >
      <Stack
        sx={{
          width: "25%",
          padding: 2,
        }}
        direction={"column"}
      >
        <Stack
          direction={"column"}
          sx={{
            justifyContent: "space-between",
            height: "100%",
            paddingBottom: "1rem",
          }}
        >
          <Container
            sx={{
              padding: 2,
              borderRadius: 5,
              backgroundColor: "#CAFBDA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Avatar
              src={teacher?.profile[teacher.profile.length - 1]}
              sx={{
                width: 100,
                height: 100,
                border: 2,
                borderColor: "white",
              }}
            />
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: 25,
                fontStyle: "normal",
              }}
            >
              {teacher?.firstName} {teacher?.middleName} {teacher?.lastName}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: 20,
                fontStyle: "normal",
              }}
            >
              Guro
            </Typography>
          </Container>
          <Button
            variant="text"
            color="success"
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
          >
            Bumalik
          </Button>
        </Stack>
      </Stack>
      <Stack
        sx={{
          width: "75%",
          padding: 2,
        }}
        direction-="column"
      >
        <Box
          sx={{
            padding: 4,
            margin: 1,
            borderRadius: 5,
            backgroundColor: "#CAFBDA",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 700,
              fontSize: 40,
              fontStyle: "normal",
            }}
          >
            {classroom?.className}
          </Typography>
          {currentAnnouncement(announcements).length != 0 && (
            <Box
              sx={{
                width: "50%",
                padding: "1rem",
                margin: "1rem",
                borderLeft: "3px solid red",
                backgroundColor: "white",
              }}
            >
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  color: " #070707",
                  fontFamily: "Poppins",
                  fontStyle: "regular",
                  fontWeight: 400,
                }}
              >
                {currentAnnouncement(announcements)[0].message}
              </Typography>
              <Typography>
                {formatDate1(currentAnnouncement(announcements)[0].date)}
              </Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Mga Aralin" {...a11yProps(0)} />
              <Tab
                label={
                  <Badge
                    badgeContent={computeUnAnsweredQuiz(
                      quiz,
                      currentUser?.uid!
                    )}
                    color="error"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    Mga Pagsusulit
                  </Badge>
                }
                {...a11yProps(1)}
              />
              <Tab label="Anunsyo" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {classroom != null &&
              (classroom.lessons != null && classroom?.lessons.length > 0 ? (
                getLessonsQuarters(classroom.lessons).map(
                  (quarter, quarterIndex) => (
                    <Stack direction={"column"} key={quarterIndex}>
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontWeight: 400,
                          fontSize: 30,
                          fontStyle: "bold",
                          marginY: 2,
                          color: "black",
                        }}
                      >
                        Quarter {quarter}
                      </Typography>
                      <Divider />
                      <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                      >
                        {getLessonsPerQuarter(quarter, classroom.lessons).map(
                          (data, index) => (
                            <Grid item xs={2} sm={4} md={4} key={index}>
                              <LessonsCard lesson={data} />
                            </Grid>
                          )
                        )}
                      </Grid>
                    </Stack>
                  )
                )
              ) : (
                <Stack
                  sx={{
                    width: "100%",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  direction={"column"}
                  spacing={1}
                >
                  <img src={nolessons} width="500px" height={"400px"} />
                  <Typography component={"h2"} variant={"h5"}>
                    Wala pang aralin
                  </Typography>
                </Stack>
              ))}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {getQuarters(quiz).map((quarter) => (
              <Stack direction={"column"}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: " #070707",
                    margin: 2,
                    fontFamily: "Poppins",
                    fontStyle: "regular",
                    fontWeight: 400,
                  }}
                >
                  Quarter {quarter}
                </Typography>
                <Divider />

                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {getQuizPerQuarter(quarter).map((data, index) => (
                    <Grid item xs={2} sm={4} md={4}>
                      <StudentQuizCard
                        quiz={data}
                        key={index}
                        myID={currentUser?.uid!}
                        takeQuiz={() => navigateToQuestions(data.id)}
                        viewResult={() => navigateToResult(data.id)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            ))}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {announcements.map((data, index) => (
              <StudentAnnouncementCard key={index} announcement={data} />
            ))}
          </TabPanel>
        </Box>
      </Stack>
    </Stack>
  );
};

export default StudentClassroomPage;
