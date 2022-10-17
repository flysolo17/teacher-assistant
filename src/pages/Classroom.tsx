import { Button, List, Typography } from "@mui/material";
import { height, Stack } from "@mui/system";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../config/config";
import { Classroom, classroomConveter } from "../model/Classroom";
import { useNavigate } from "react-router-dom";
import AlignItemsList from "../components/UsersCard";
import UsersCard from "../components/UsersCard";
interface ClassroomPageProps {}

const ClassroomPage: React.FunctionComponent<ClassroomPageProps> = (props) => {
  const { id } = useParams();
  const [classroom, setClassroom] = useState<Classroom>();
  const [invitation, setInvitation] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();
  async function getClassroomData() {
    const docRef = doc(firestore, "Classroom", id!).withConverter(
      classroomConveter
    );
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      setClassroom(snap.data());
      console.log("nice");
    } else {
      navigate("/*");
    }
  }

  useEffect(() => {
    getClassroomData();
  }, []);

  useEffect(() => {
    const q = query(
      collection(firestore, "Invitations"),
      where("classID", "==", id!)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let data: any[] = [];
      querySnapshot.forEach((docs) => {
        data.push({ ...docs.data(), id: docs.id });
      });

      console.log("rendered: invites");
      setInvitation(data);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const q = query(
      collection(firestore, "Users"),
      where("type", "==", "Student")
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let data: any[] = [];
      querySnapshot.forEach((docs) => {
        data.push({ ...docs.data(), id: docs.id });
      });
      console.log("rendered: Classroom");
      setUsers(data);
    });
    return () => unsub();
  }, []);

  function isInvited(userID: string): boolean {
    let invited = false;
    invitation.forEach((invitation) => {
      if (invitation.studentID == userID) {
        invited = true;
      }
    });
    return invited;
  }
  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%", height: "100vh" }}>
        <Stack direction={"column"} sx={{ width: "20%" }}>
          <Typography>Students</Typography>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,

              position: "relative",
              overflow: "auto",
              maxHeight: "100%s",
              "& ul": { padding: 0 },
            }}
          >
            {users.map((user) => (
              <li key={user.id}>
                <UsersCard
                  user={user}
                  classID={id!}
                  isInvited={isInvited(user.id)}
                />
              </li>
            ))}
          </List>
        </Stack>
        <div className="table"></div>
      </Stack>
    </>
  );
};

export default ClassroomPage;
