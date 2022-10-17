import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPHnty6mo5BRzKH_OwXb7u-D_cB_FsKw4",
  authDomain: "teacher-assistant-787c8.firebaseapp.com",
  projectId: "teacher-assistant-787c8",
  storageBucket: "teacher-assistant-787c8.appspot.com",
  messagingSenderId: "178685498437",
  appId: "1:178685498437:web:a5e4df978c13f47a853f2c",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
