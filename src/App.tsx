import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";

import LoginPage from "./pages/Login";
import NotFound from "./notfound/NotFound";
import SignUpPage from "./pages/SignUp";

import MainPage from "./pages/Main";
import TeacherHomePage from "./pages/TeacherHome";

import AccountPage from "./pages/Account";

export interface IApplicationProps {}
const App: React.FunctionComponent<IApplicationProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/classroom"
          element={
            <AuthRoute>
              <TeacherHomePage />
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
          path="*"
          element={
            <AuthRoute>
              <TeacherHomePage />
            </AuthRoute>
          }
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
