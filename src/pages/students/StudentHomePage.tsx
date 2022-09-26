import { getAuth ,signOut} from "firebase/auth";
export interface IStudentHomePageProps{}

const StudentHomePage : React.FunctionComponent<IStudentHomePageProps> = (props) => {
        const auth = getAuth();
    return (
        <>
            <h1>Student {auth.currentUser?.displayName}</h1>
            <button onClick={() =>signOut(auth)}> Logout</button>
        </>
    );
}

export default StudentHomePage;