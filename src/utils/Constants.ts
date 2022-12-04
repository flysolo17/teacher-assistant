import class1 from "../images/class01.jpg";
import class2 from "../images/class02.jpg";
import class3 from "../images/class03.jpg";
import class4 from "../images/class04.jpg";
import class5 from "../images/class05.jpg";
import class6 from "../images/class06.jpg";
import class7 from "../images/class07.jpg";
import class8 from "../images/class09.jpg";
import PNG from "../images/png.png";
import PDF from "../images/pdf.png";
import MP4 from "../images/mp4.png";
import FILE from "../images/file.png";
import JPG from "../images/jpg.png";
import DOC from "../images/doc.png";
import { Quiz } from "../model/Quiz";
import { Lesson } from "../model/Lesson";
import { Student } from "../model/Student";
export const colorPicker: string[] = [
  "#C7C6FA",
  "#97F8C0",
  "#9DFDE4",
  "#D9D6FE",
  "#91C6EE",
  "#CFD8F7",
  "#FDBCC7",
  "#FCCEEE",
  "#FDDCAB",
];
export function getImage(color: string): string {
  let img = class1;
  switch (color) {
    case "#C7C6FA":
      img = class1;
      break;
    case "#97F8C0":
      img = class2;
      break;
    case "#9DFDE4":
      img = class3;
      break;
    case "#D9D6FE":
      img = class4;
      break;
    case "#91C6EE":
      img = class5;
      break;
    case "#CFD8F7":
      img = class6;
      break;
    case "#FDBCC7":
      img = class7;
      break;
    case "#FCCEEE":
      img = class8;
      break;
    case "#FDDCAB":
      img = class1;
      break;
    default:
      img = class1;
      break;
  }
  return img;
}
export function getFileType(file: string): string {
  let type = FILE;
  switch (file) {
    case "image/png":
      type = PNG;
      break;
    case "image/jpeg":
      type = JPG;
      break;
    case "application/pdf":
      type = PDF;
      break;
    case "video/mp4":
      type = MP4;
      break;
    case "application/docx" || "application/doc":
      type = DOC;
      break;
    default:
      type = FILE;
      break;
  }
  return type;
}
export function getFileColor(file: string): string {
  let type = class1;
  switch (file) {
    case "image/png":
      type = class2;
      break;
    case "image/jpeg":
      type = class3;
      break;
    case "application/pdf":
      type = class4;
      break;
    case "video/mp4":
      type = class5;
      break;
    case "application/doc":
      type = class6;
      break;
    default:
      type = class7;
      break;
  }
  return type;
}

export const PROFILE_PATH = "profile";
export const LESSONS_PATH = "lessons";

export function downloadPdf(url: string) {}
export function formatTimestamp(timestamp: number) {
  const current_datetime = new Date(timestamp);
  return current_datetime.toLocaleString();
}
export const quarters = [
  {
    value: "1",
    label: "1ST QUARTER",
  },
  {
    value: "2",
    label: "2ND QUARTER",
  },
  {
    value: "3",
    label: "3RD QUARTER",
  },
  {
    value: "4",
    label: "4TH QUARTER",
  },
];

export const getQuarters = (list: Quiz[]): number[] => {
  const current = list.map((data) => data.quarter);
  return current.filter((value, index) => current.indexOf(value) === index);
};

export const getLessonsQuarters = (list: Lesson[]): number[] => {
  const current = list.map((data) => data.quarter);
  return current.filter((value, index) => current.indexOf(value) === index);
};
export const getLessonsPerQuarter = (
  quarter: number,
  lessons: Lesson[]
): Lesson[] => {
  return lessons.filter((data) => data.quarter == quarter);
};

export const getScore = (quiz: Quiz, myID: string): string => {
  var result = "";
  const over = quiz.questions.length;
  const quizzee = quiz.students.filter((student) => student.studentID == myID);
  let score = 0;
  if (quiz.isOpen) {
    if (quizzee.length != 0) {
      quiz.questions.map((data, index) => {
        if (data.answer == quizzee[0].answers[index]) {
          score += 1;
        }
      });
      if (quiz.showResult) {
        result = score + " / " + over;
      }
    }
  }
  return result;
};

export const getStudent = (quiz: Quiz, myID: string): Student => {
  const quizzee = quiz.students.filter((student) => student.studentID == myID);

  return quizzee[0];
};
export const responsesScores = (quiz: Quiz, student: Student): string => {
  var result = "";
  const over = quiz.questions.length;
  let score = 0;
  quiz.questions.map((data, index) => {
    if (data.answer == student.answers[index]) {
      score += 1;
    }
    result = score + " / " + over;
  });

  return result;
};
export const computeTotalScore = (answerSheet: string, answer: string) => {};

export const computeUnAnsweredQuiz = (quiz: Quiz[], myID: string): number => {
  var result = 0;
  quiz.map((data) => {
    const stud = data.students.map((s) => s.studentID);
    if (!stud.includes(myID)) {
      result += 1;
    }
  });
  return result;
};
