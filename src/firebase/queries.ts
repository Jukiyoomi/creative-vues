import * as firebase from "firebase/firestore";
import { auth, db } from "@/firebase/index";
import { Post } from "@/interfaces";

export const getCollection = (table: string) => firebase.collection(db, table);
export async function createDoc(table: string, data: Partial<unknown>) {
  return await firebase.addDoc(getCollection(table), {
    ...data,
    timestamp: firebase.serverTimestamp(),
    modified: false,
    likes: [],
  });
}

export async function getDocs(table: string, cb: (data: Post[]) => void) {
  const q = firebase.query(
    getCollection(table),
    firebase.orderBy("timestamp", "desc")
  );

  return firebase.onSnapshot(q, (snapshot) => {
    const result = snapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        user: auth.currentUser?.uid,
        id: doc.id,
      } as Post;
    });
    cb(result);
  });
}

export async function deleteDocs(table: string, id: string) {
  const docRef = firebase.doc(db, table, id);
  await firebase.deleteDoc(docRef);
}

export async function updateDocs(
  table: string,
  id: string,
  data: Partial<unknown>
) {
  const docRef = firebase.doc(db, table, id);
  return await firebase.updateDoc(docRef, {
    ...data,
  });
}
