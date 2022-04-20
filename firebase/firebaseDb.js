import { getFirestore } from "firebase/firestore";
import firebaseApp from "./firebaseApp";

const firebaseDb = getFirestore(firebaseApp);

export default firebaseDb;
