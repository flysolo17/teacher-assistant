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

export interface IApplicationProps {}
const App: React.FunctionComponent<IApplicationProps> = (props) => {
  return (
    <BrowserRouter>
      <AuthProvider>
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
            <Route path=":id" element={<ClassroomPage />} />
          </Route>

          <Route
            path="/profile"
            element={
              <AuthRoute>
                <AccountPage />
              </AuthRoute>
            }
          />
          <Route
            path="/"
            element={
              <AuthRoute>
                <MainPage />
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
