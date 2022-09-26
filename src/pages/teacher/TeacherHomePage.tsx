import React, { useState } from 'react';
import { getAuth,signOut } from 'firebase/auth';

export interface ITeacherHomePageProps{}

const TeacherHomePage : React.FunctionComponent<ITeacherHomePageProps> = (props) => {
        const auth = getAuth();
    return (
        <>
            <h1>Teacher {auth.currentUser?.displayName}</h1>
            <button onClick={() =>signOut(auth)}> Logout</button>
        </>
    );
}

export default TeacherHomePage;