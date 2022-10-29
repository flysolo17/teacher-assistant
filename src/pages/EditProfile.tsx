import { v4 as uuidV4 } from "uuid";
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  doc,
  arrayUnion,
  FieldValue,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { auth, firestore, storage } from "../config/config";
import { userConverter, Users } from "../model/User";
import { PROFILE_PATH } from "../utils/Constants";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useParams, useNavigate } from "react-router-dom";

interface EditProfilePageProps {}

const EditProfilePage: React.FunctionComponent<EditProfilePageProps> = () => {
  const [user, setUser] = useState<Users>();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handdleOnChange = (e: any) => {
    const file = e.target.files[0];
    uploadFile(file);
  };
  function uploadFile(file: any) {
    setLoading(true);
    if (file == null) return;
    const fileref = ref(storage, `${PROFILE_PATH}/${id}/${uuidV4()}`);
    uploadBytes(fileref, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          updateProfile(url);
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }
  async function updateProfile(url: string) {
    const ref = doc(firestore, "Users", id!);
    await updateDoc(ref, {
      profile: arrayUnion(url),
    });
  }

  function updateFullname() {
    const ref = doc(firestore, "Users", id!);
    setLoading(true);
    updateDoc(ref, {
      firstName: user?.firstName,
      middleName: user?.middleName,
      lastName: user?.lastName,
    })
      .then(() => {
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    const unsub = onSnapshot(
      doc(firestore, "Users", id!).withConverter(userConverter),
      (doc) => {
        setUser(doc.data());
        console.log(doc.data());
      }
    );
    return () => unsub();
  }, []);
  if (loading) {
    return (
      <>
        <Container
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Container>
      </>
    );
  }
  return (
    <Container sx={{ width: "100%", height: "100%", padding: 5 }}>
      <Paper
        sx={{ width: "80%", alignSelf: "center", padding: 10 }}
        elevation={1}
      >
        <Stack direction={"column"} spacing={2}>
          <Stack
            direction={"row"}
            sx={{
              width: "100%",
              margin: 2,
            }}
            spacing={1}
          >
            <Avatar
              src={user?.profile[user.profile.length  - 1]}
              alt="profile"
              sx={{ width: 120, height: 120 }}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handdleOnChange}
              />
              <PhotoCamera />
            </IconButton>
          </Stack>

          <Stack
            direction={"row"}
            spacing={2}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant={"h6"} component={"h2"} sx={{ width: 200 }}>
              Firstname
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={user?.firstName}
              onChange={(e) => setUser({ ...user!, firstName: e.target.value })}
            />
          </Stack>

          <Stack
            direction={"row"}
            spacing={2}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant={"h6"} component={"h2"} sx={{ width: 200 }}>
              Middlename
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={user?.middleName}
              onChange={(e) =>
                setUser({ ...user!, middleName: e.target.value })
              }
            />
          </Stack>
          <Stack
            direction={"row"}
            spacing={2}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant={"h6"} component={"h2"} sx={{ width: 200 }}>
              Lastname
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={user?.lastName}
              onChange={(e) => setUser({ ...user!, lastName: e.target.value })}
            />
          </Stack>
          <Button
            sx={{ width: 100, alignSelf: "flex-end" }}
            variant={"contained"}
            color={"success"}
            onClick={updateFullname}
          >
            Save
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default EditProfilePage;
