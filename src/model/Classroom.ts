import { doc, QueryDocumentSnapshot } from "firebase/firestore";
import { Lesson } from "./Lesson";
import { Users } from "./User";

export interface Classroom {
  className: string;
  createdAt: number;
  color: string;
  students: Array<string>;
  lessons: Array<Lesson>;
  teacher: string;
}
export const classroomConveter = {
  toFirestore: (data: Classroom) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Classroom,
};
