import {
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import uniqid from "uniqid";
import { deleteObject, ref } from "firebase/storage";

export const deleteEvent = async (courseID) => {
  try {
    await deleteDoc(doc(db, "events", courseID));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const appendImage = async (URL, genratedID) => {
  const imageRef = doc(db, "images", genratedID);
  await setDoc(imageRef, {
    url: URL,
    id: genratedID,
    selected: false,
  });
};

export const createUserInDb = async (data) => {
  const { uid } = data;
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, {
    ...data,
  });
};
export const fetchUser = async (uid) => {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());

    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    return null;
  }
};

export const saveUserEvent = async (event, user, tickets) => {
  try {
    const { uid } = user;
    const userRef = doc(db, "users", uid);

    // Add the event to the user's events array
    await setDoc(
      userRef,
      {
        events: arrayUnion({
          id: event.id, // Assuming eventId is a unique identifier for the event
          tickets,
        }),
      },
      { merge: true }
    );

    console.log("Event saved to user's events array successfully!");
  } catch (error) {
    console.error("Error saving event to user's events array:", error);
    throw error;
  }
};
