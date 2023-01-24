import { Classroom } from "./Classroom";

export interface Announcement {
  id: string;
  teacherID: string;
  message: string;
  classrooms: String[];
  date: number;
}
