import { doc, QueryDocumentSnapshot } from "firebase/firestore";
import { Users } from "./User";

export interface Classroom {
  className: string;
  createdAt: Date;
  color: string;
  students: Array<string>;
  lessons: Array<string>;
  announcements: Array<string>;
  teacher: string;
}
export const classroomConveter = {
  toFirestore: (data: Classroom) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Classroom,
};
