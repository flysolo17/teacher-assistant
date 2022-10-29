import { doc, QueryDocumentSnapshot } from "firebase/firestore";

export interface Users {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  type: string;
  email: string;
  profile: string[];
}

export const userConverter = {
  toFirestore: (data: Users) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Users,
};
