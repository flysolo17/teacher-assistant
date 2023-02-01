import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";

import LoginPage from "./pages/Login";
import NotFound from "./notfound/NotFound";
import SignUpPage from "./pages/SignUp";
import "./App.css";
import TeacherHomePage from "./pages/TeacherHome";

import AccountPage from "./pages/Account";
import { AuthProvider } from "./context/AuthContext";
import MainPage from "./pages/Main";
import ClassroomPage from "./pages/Classroom";
import EditProfilePage from "./pages/EditProfile";
import { useAuth } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { userConverter, Users } from "./model/User";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "./config/config";
import { User } from "firebase/auth";
import StudentClassroomPage from "./pages/StudentClassroom";

import CreateQuizPage from "./pages/CreateQuiz";
import ViewQuizPage from "./pages/ViewQuiz";
import TakeQuizPage from "./pages/TakeQuiz";
import StudentViewResultPage from "./pages/StudentViewResult";
import { Announcement } from "@mui/icons-material";
import AnnouncementPage from "./pages/AnnouncementPage";
import QuizPage from "./pages/Quiz";
import MyStudentsPage from "./pages/MyStudents";
import CreateActivityPage from "./pages/CreateActivity";
import DevelopersPage from "./pages/Developers";
import StudentGradePage from "./pages/StudentGrade";
import UpdatePasswordPage from "./pages/UpdatePassword";
export interface IApplicationProps {}
const App: React.FunctionComponent<IApplicationProps> = (props) => {
  const currentUser: User | null = auth.currentUser;

  return (
    <BrowserRouter>
      <AuthProvider current={currentUser}>
        <Routes>
          <Route path="/classroom">
            <Route
              index
              element={
                <AuthRoute>
                  <MainPage />
                </AuthRoute>
              }
            />

            <Route path=":id" element={<ClassroomPage />}></Route>
            <Route path=":id/create-quiz" element={<CreateQuizPage />} />
            <Route path=":id/view-quiz/:quizID" element={<ViewQuizPage />} />
            <Route path=":id/student/:studentID" element={<MyStudentsPage />} />
            <Route path="student/:id" element={<StudentClassroomPage />} />
            <Route
              path="student/:id/take-quiz/:quizID"
              element={<TakeQuizPage />}
            />
            <Route
              path="student/:id/result/:quizID"
              element={<StudentViewResultPage />}
            />
          </Route>
          <Route
            path="/create-activity"
            element={
              <AuthRoute>
                <CreateActivityPage />
              </AuthRoute>
            }
          />
          <Route
            path="/developers"
            element={
              <AuthRoute>
                <DevelopersPage />
              </AuthRoute>
            }
          />
          <Route
            path="/grades"
            element={
              <AuthRoute>
                <StudentGradePage />
              </AuthRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthRoute>
                <AccountPage />
              </AuthRoute>
            }
          />
          <Route
            path="/quiz"
            element={
              <AuthRoute>
                <QuizPage />
              </AuthRoute>
            }
          />
          <Route
            path="/announcement"
            element={
              <AuthRoute>
                <AnnouncementPage />
              </AuthRoute>
            }
          />
          {/* <Route
            path="/students"
            element={
              <AuthRoute>
                <MyStudentsPage />
              </AuthRoute>
            }
          /> */}
          <Route
            path="/"
            element={
              <AuthRoute>
                <MainPage />
              </AuthRoute>
            }
          />

          <Route
            path="/profile/edit/:id"
            element={
              <AuthRoute>
                <EditProfilePage />
              </AuthRoute>
            }
          />
          <Route
            path="/profile/edit-password/:id"
            element={
              <AuthRoute>
                <UpdatePasswordPage />
              </AuthRoute>
            }
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
export default App;
