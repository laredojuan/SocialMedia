import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "lib/firebase";

export default async function isUsernameExists(username) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return querySnapshot.size > 0; //if the size is greater than zero the query found documents
} //gonna return false if username don't exist
