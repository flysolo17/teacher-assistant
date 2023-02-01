import { QueryDocumentSnapshot } from "firebase/firestore";

export interface Activities {
  teacher: string;
  url: string;
  name: string;
  type: string;
  quarter: number;
  createdAt: number;
  classroomID: string[];
}

export const classroomConveter = {
  toFirestore: (data: Activities) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Activities,
};
