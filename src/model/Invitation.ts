import { doc, QueryDocumentSnapshot } from "firebase/firestore";

export interface Invitation {
  accepted: boolean;
  classID: string;
  studentID: string;
  date: number;
}

export const userConverter = {
  toFirestore: (data: Invitation) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Invitation,
};
