import React from 'react';
import { BrowserRouter,Routes ,Route} from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { config } from './config/config';
import AuthRoute from './components/AuthRoute';
import TeacherHomePage from './pages/teacher/TeacherHomePage';
import StudentHomePage from './pages/students/StudentHomePage';
import LoginPage from './pages/Login';
import NotFound from './notfound/NotFound';
import SignUpPage from './pages/SignUp';

initializeApp(config.firebaseConfig);
export interface IApplicationProps{

}
const App : React.FunctionComponent<IApplicationProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={
            <AuthRoute>
              <TeacherHomePage/>
            </AuthRoute>}/>
            <Route path='/student' element={
            <AuthRoute>
              <StudentHomePage/>
            </AuthRoute>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='*' element={<NotFound/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
