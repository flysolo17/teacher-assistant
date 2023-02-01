import { QueryDocumentSnapshot } from "firebase/firestore";

export interface Grades {
  id: string;
  classroomID: string;
  studentID: string;

  grade: Grade;
  createdAt: number;
}
export interface Grade {
  first: number;
  second: number;
  third: number;
  fourth: number;
}

export const gradesConveter = {
  toFirestore: (data: Grades) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Grades,
};
