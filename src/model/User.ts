
import { doc, QueryDocumentSnapshot} from "firebase/firestore";

export interface Users {
    firstName : String;
    middleName : String;
    lastName : String;
    type : String;
    email : String;
}
export const userConverter = {
  toFirestore: (data: Users) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) =>
    snap.data() as Users
}