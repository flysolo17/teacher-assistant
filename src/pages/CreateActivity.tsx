import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import nolessons from "../images/nolessons.png";
import React, { useEffect, useState } from "react";
import { firestore, storage } from "../config/config";
import { useAuth } from "../context/AuthContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import {
  getImage,
  getMarkahan,
  LESSONS_PATH,
  quarters,
} from "../utils/Constants";
import { v4 as uuidV4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Activities } from "../model/Activities";
import LessonsCard from "../components/LessonsCard";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
interface CreateActivityPageProps {}

const CreateActivityPage: React.FunctionComponent<CreateActivityPageProps> = (
  props
) => {
  const [checked, setChecked] = useState<number[]>([]);
  const [checkID, setCheckedID] = useState<string[]>([]);
  const [pickedFile, setPickedFile] = useState<any>(null);
  const [activityName, setActivityName] = useState("");
  const [activities, setActivities] = useState<any[]>([]);
  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    const newCheckedID = [...checkID];
    if (currentIndex === -1) {
      newChecked.push(value);
      newCheckedID.push(classroom[value].id);
    } else {
      newChecked.splice(currentIndex, 1);
      newCheckedID.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    setCheckedID(newCheckedID);
    console.log("checkedID", newCheckedID);
  };

  const [classroom, setClassrooms] = useState<any[]>([]);
  const { currentUser } = useAuth();

  const getAllClassroom = (id: string) => {
    const q = query(
      collection(firestore, "Classroom"),
      where("teacher", "==", id)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      let data: any[] = [];
      snapshot.forEach((docs) => {
        data.push({ ...docs.data(), id: docs.id });
      });
      console.log("create", data);
      setClassrooms(data);
    });
    return () => unsub();
  };

  useEffect(() => {
    if (currentUser != null) {
      getAllClassroom(currentUser.uid);
    }
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuarter(event.target.value);
  };
  const [quarter, setQuarter] = useState("1");
  function uploadFile(id: string) {
    if (pickedFile != null && checkID.length != 0) {
      const fileref = ref(storage, `${LESSONS_PATH}//${uuidV4()}`);
      uploadBytes(fileref, pickedFile)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            let lesson: Activities = {
              teacher: id,
              url: url,
              name: activityName,
              type: pickedFile.type,
              quarter: parseInt(quarter),
              createdAt: new Date().getTime(),
              classroomID: checkID,
            };
            createLesson(lesson);
          });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => console.log("Uploaded"));
    } else {
      alert("Failed");
    }
  }
  async function createLesson(lesson: Activities) {
    try {
      const docRef = await addDoc(collection(firestore, "Activities"), lesson);
      alert("Success");
      setActivityName("");
    } catch (e) {
      alert(e);
    }
  }

  async function deleteLesson(id: string) {
    try {
      const docRef = await deleteDoc(doc(firestore, "Activities", id));
      alert("Tagumpay");
    } catch (e) {
      alert(e);
    }
  }

  const handdleOnChange = (e: any) => {
    const file = e.target.files[0];
    if (file.size < 5000000) {
      setPickedFile(file);
    } else {
      alert("Invalid File");
    }
  };

  function getActivities(id: string) {
    console.log("activities");
    const q = query(
      collection(firestore, "Activities"),
      where("teacher", "==", id),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      let data: any[] = [];
      snapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setActivities(data);
    });
    return () => unsub();
  }

  useEffect(() => {
    if (currentUser != null) {
      getActivities(currentUser.uid);
    }
  }, []);
  return (
    <Stack
      direction={"row"}
      sx={{ width: "100%", height: "100vh", overflow: "hidden" }}
    >
      <Box
        sx={{
          width: 500,
          height: "100%",
          overflow: "auto",
          padding: "1rem",
        }}
      >
        <h2>Gumawa ng aktibidad</h2>
        <br />
        <Divider />
        <br />
        <h4>Mga Klase</h4>
        <List
          dense
          sx={{
            width: "100%",
            maxHeight: 600,
            bgcolor: "background.paper",
            paddingTop: "1rem",
          }}
        >
          {classroom.map((value, index) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <ListItem
                key={index}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(index)}
                    checked={checked.indexOf(index) !== -1}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${index + 1}`}
                      src={getImage(value.color)}
                      sx={{ width: 40, height: 40 }}
                      variant="rounded"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    id={labelId}
                    primary={value.className}
                    sx={{
                      fontFamily: "Poppins",
                      fontWeight: 400,
                      fontStyle: "normal",
                      fontSize: 24,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Stack direction={"column"} spacing={2} sx={{ width: "100%" }}>
          <br />
          <h3>Impormasyon</h3>
          <input
            type={"file"}
            accept="application/pdf, application/msword, image/*"
            id="filled-basic"
            onChange={handdleOnChange}
            placeholder="Pangalan ng aktividad"
          />
          <TextField
            type={"text"}
            id="filled-basic"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            label="Pangalan ng aktibidad"
            variant="filled"
          />

          <TextField
            id="outlined-select-quater-native"
            select
            sx={{
              marginY: 2,
            }}
            label="Select Quarter"
            value={quarter}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
            helperText="Pumili ng Markahan"
          >
            {quarters.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <Button onClick={() => uploadFile(currentUser?.uid!)}>Isubmit</Button>
        </Stack>
      </Box>
      <Divider />
      <Container
        sx={{
          flexGrow: 1,
          width: "100%",
          height: "100%",
          padding: "1rem",
        }}
      >
        <h2>Mga Akitibidad</h2>
        <br />
        <Divider />
        <TableContainer>
          <Table
            sx={{ width: "100%" }}
            size="medium"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <h4>Pangalan</h4>
                </TableCell>
                <TableCell align="left">
                  <h4>Markahan</h4>
                </TableCell>
                <TableCell align="right">
                  <h4>Date</h4>
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activities.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{getMarkahan(row.quarter)}</TableCell>
                  <TableCell align="right">
                    {new Date(row.createdAt).toLocaleDateString("en-us")}
                  </TableCell>
                  <TableCell align={"right"}>
                    <IconButton
                      color="error"
                      onClick={() => deleteLesson(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Stack>
  );
};

export default CreateActivityPage;
