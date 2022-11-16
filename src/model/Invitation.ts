import { doc, QueryDocumentSnapshot } from "firebase/firestore";

export interface Invitation {
  accepted: boolean;
  classID: string;
  className: string;
  studentID: string;
  teacherID: string;
  date: number;
}

export const invitationConverter = {
  toFirestore: (data: Invitation) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Invitation,
};
