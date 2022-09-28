import { doc, QueryDocumentSnapshot } from "firebase/firestore";
import { Users } from "./User";

export interface Classroom {
  teacher: string;
  section: string;
  createdAt: number;
  students: Array<string>;
  modules: Array<string>;
  announcements: Array<string>;
}
export const classroomConveter = {
  toFirestore: (data: Classroom) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Classroom,
};
