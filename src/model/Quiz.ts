import { Student } from "./Student";
import { Questions } from "./Questions";
import { QueryDocumentSnapshot } from "firebase/firestore";

export interface Quiz {
  name: string;
  desc: string;
  questions: Array<Questions>;
  students: Array<Student>;
  quarter: number;
  isOpen: boolean;
  showResult: false;
  createdAt: number;
}

export const quizConverter = {
  toFirestore: (data: Quiz) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Quiz,
};
