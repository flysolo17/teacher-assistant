import { QueryDocumentSnapshot } from "firebase/firestore";

export interface Lesson {
  url: string;
  name: string;
  size: number;
  type: string;
  quarter: number;
  createdAt: number;
  classroomID: string;
}

export const classroomConveter = {
  toFirestore: (data: Lesson) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Lesson,
};
