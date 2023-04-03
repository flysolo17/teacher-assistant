import { Activities } from "./../model/Activities";
import { Announcement } from "./../model/Announcement";
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

import Dave from "../images/dave.png";
import Mariztela from "../images/Mariztela.png";
import Angelika from "../images/angelika.png";
import Jed from "../images/jed.png";
import Rommel from "../images/Rommel.png";
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
    label: "Unang Markahan",
  },
  {
    value: "2",
    label: "Ikalawang Markahan",
  },
  {
    value: "3",
    label: "Ikatlong Markahan",
  },
  {
    value: "4",
    label: "Ikaapat na markahan",
  },
];

export const getQuarters = (list: Quiz[]): number[] => {
  const current = list.map((data) => data.quarter);
  return current.filter((value, index) => current.indexOf(value) === index);
};
export const timestamp = (): number => {
  return new Date().getTime();
};

export const getLessonsQuarters = (list: Activities[]): number[] => {
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
export const formatDate1 = (timestamp: number): string => {
  return new Date(timestamp).toDateString();
};

export const currentAnnouncement = (
  announcement: Announcement[]
): Announcement[] => {
  const data = announcement.filter(
    (data) =>
      data.date >= startOfDay(timestamp()) && data.date <= endOfDay(timestamp())
  );
  return data.reverse();
};

//set the  time of the moment into (0-0-1)
export function startOfDay(timstamp: number) {
  var date = new Date(timstamp);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(1);
  return date.getTime();
}
//set the time of the moment into (23-59-59)
export function endOfDay(timestamp: number) {
  var date = new Date(timestamp);
  date.setHours(23);
  date.setMinutes(59);
  date.setSeconds(59);
  return date.getTime();
}
export function getMarkahan(num: number): string {
  if (num == 1) {
    return "Unang Markahan";
  } else if (num == 2) {
    return "Pangalawang Markahan";
  } else if (num == 3) {
    return "Ikatlong Markahan";
  } else if (num == 4) {
    return "Ikapat na Markahan";
  } else {
    return "Walang nakalagay";
  }
}

export const developers = [
  {
    name: "Jed O. Gomez ",
    image: Jed,
    title: "Web Developer",
    role: "",
  },
  {
    name: "Dave Andrew P. Doranio",
    image: Dave,
    title: "UI/UX designer",
    role: "",
  },
  {
    name: "Mariztela Joyce S. Gacia ",
    image: Mariztela,
    title: "Reserch Paper",
    role: "",
  },
  {
    name: "Angelika S. Songco",
    image: Angelika,
    title: "Assistant Designer",
    role: "",
  },
  {
    name: "Rommel M. Bacuel",
    image: Rommel,
    title: "Web Developer",
    role: "",
  },
];
