import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import AnnouncementCard from "../components/AnnouncementCard";
import CreateAnnouncementDialog from "../components/CreateAnnouncement";
import { firestore } from "../config/config";
import { useAuth } from "../context/AuthContext";

interface AnnouncementPageProps {}

const AnnouncementPage: React.FunctionComponent<AnnouncementPageProps> = () => {
  const { currentUser } = useAuth();
  const [classroom, setClassroom] = useState<any[]>([]);
  const [announcement, setAnnouncement] = useState("");
  const [link, setLink] = useState("");
  const [announementList, setAnnouncementList] = useState<any[]>([]);
  useEffect(() => {
    if (currentUser != null) {
      getAllClassroom(currentUser.uid);
    }
  }, []);
  useEffect(() => {
    getAnnouncements();
  }, []);
  const getAllClassroom = (myID: string) => {
    const REF = collection(firestore, "Classroom");
    const q = query(
      REF,
      where("teacher", "==", myID),
      orderBy("createdAt", "desc")
    );
    getDocs(q)
      .then((value) => {
        let data: any[] = [];
        value.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setClassroom(data);
      })
      .catch((err) => alert(err.message))
      .finally(() => console.log("class", classroom));
  };
  const getAnnouncements = () => {
    if (currentUser != null) {
      const REF = collection(firestore, "Announcements");
      const q = query(
        REF,
        where("teacherID", "==", currentUser?.uid),
        orderBy("date", "desc")
      );
      const unsub = onSnapshot(q, (snapshot) => {
        let data: any[] = [];
        snapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setAnnouncementList(data);
        console.log("announcements", data);
      });
      return () => unsub();
    }
  };
  return (
    <Stack
      direction={"column"}
      spacing={2}
      sx={{
        padding: "1rem",
      }}
    >
      <div className="header">
        <p className="name">Anunsyo </p>
      </div>
      <Divider />
      <Stack direction={"row"} spacing={2}>
        <Paper
          sx={{
            width: "20%",
            padding: "1rem",
            display: "flex",
            height: "250px",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "5px",
            gap: "10px",
          }}
          elevation={1}
        >
          <TextField
            id="standard-multiline-static"
            label="Mag sagawa ng anunsyo"
            fullWidth
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            color="success"
            multiline
            rows={4}
            variant="standard"
          />
          <TextField
            id="standard-multiline-static"
            label="Link"
            fullWidth
            value={link}
            onChange={(e) => setLink(e.target.value)}
            color="success"
            variant="standard"
          />
          <CreateAnnouncementDialog
            message={announcement}
            classroom={classroom}
            link={link}
            teacherID={currentUser?.uid!}
          />
        </Paper>
        <Stack direction={"column"} spacing={2} sx={{ flexGrow: 1 }}>
          {announementList.map((value, index) => (
            <AnnouncementCard key={index} announcement={value} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AnnouncementPage;
