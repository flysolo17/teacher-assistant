import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCw1aHMBMDC3GmBJTwFLdHyuFZXExBLxVQ",
  authDomain: "final-project-7ad69.firebaseapp.com",
  databaseURL: "https://final-project-7ad69.firebaseio.com",
  projectId: "final-project-7ad69",
  storageBucket: "final-project-7ad69.appspot.com",
  messagingSenderId: "301540143091",
  appId: "1:301540143091:web:57ee3d274e07f8af35ac86",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
