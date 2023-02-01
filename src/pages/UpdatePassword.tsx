import {
  Alert,
  Button,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Email, Password } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface UpdatePasswordPageProps {}

const UpdatePasswordPage: React.FunctionComponent<
  UpdatePasswordPageProps
> = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  function reauthenticatePassword() {
    if (currentUser != null) {
      if (currentPassword == "" || newPassword == "" || confirmPassword == "") {
        alert("Mali ang nilagay na impormasyon");
      } else if (newPassword != confirmPassword) {
        alert("Ang bagong password ay di magkatulad");
      } else {
        reauthenticateWithCredential(
          currentUser,
          EmailAuthProvider.credential(currentUser?.email!, currentPassword)
        )
          .then((task) => {
            updatePassword(task.user, newPassword)
              .then((task) => {
                alert("Tagumpay ang pagpapalit ng password!");
              })
              .catch((e) => {
                alert(e.message);
              });
          })
          .catch((e) => {
            Alert(e.message);
          })
          .finally(() => {
            navigate(-1);
          });
      }
    }
  }
  return (
    <main className="update-password">
      <Paper
        elevation={1}
        sx={{ width: "80%", alignSelf: "center", padding: 10 }}
      >
        <h1 style={{ marginBottom: "1rem", color: "red" }}>
          Magpalit ng Password
        </h1>
        <Stack direction={"column"} spacing={2}>
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
              Kasalukuyang Password
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
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
              Bagong Password
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={newPassword}
              type={"password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Password />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setNewPassword(e.target.value)}
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
              Kumpirmahin
            </Typography>
            <TextField
              fullWidth
              size="small"
              type={"password"}
              value={confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Password />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Stack>
          <Button
            sx={{ width: 100, alignSelf: "flex-end" }}
            variant={"contained"}
            color={"success"}
            onClick={() => reauthenticatePassword()}
          >
            Isubmit
          </Button>
        </Stack>
      </Paper>
    </main>
  );
};

export default UpdatePasswordPage;
