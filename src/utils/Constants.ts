import class1 from "../images/class01.jpg";
import class2 from "../images/class02.jpg";
import class3 from "../images/class03.jpg";
import class4 from "../images/class04.jpg";
import class5 from "../images/class05.jpg";
import class6 from "../images/class06.jpg";
import class7 from "../images/class07.jpg";
import class8 from "../images/class09.jpg";
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

export function getColor(): string {
  return class1;
}
export const PROFILE_PATH = "profile";
export const LESSONS_PATH = "lessons";

export function downloadPdf(url: string) {}
