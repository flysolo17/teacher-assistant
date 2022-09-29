import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAL5E7SAZLHfGRV6u0HOhAwWZ5JJMIi-QU",
  authDomain: "teacher-assistantv1.firebaseapp.com",
  projectId: "teacher-assistantv1",
  storageBucket: "teacher-assistantv1.appspot.com",
  messagingSenderId: "144981786232",
  appId: "1:144981786232:web:19e732d4ec1da633a2f78d",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
