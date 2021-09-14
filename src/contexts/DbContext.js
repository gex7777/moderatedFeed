import React, { useContext } from "react";
import { useState } from "react";
import {
  collection,
  collectionGroup,
  addDoc,
  doc,
  getDoc,
  setDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

const DatabaseContext = React.createContext();
export const useDatabase = () => {
  return useContext(DatabaseContext);
};
export default function DbProvider({ children }) {
  const { currentUser } = useAuth();
  const [data, setData] = useState([]);

  const addPost = async (obj) => {
    const { author } = obj;
    try {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, { author });
      }
      await addDoc(collection(db, "users", currentUser.uid, "posts"), obj);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getPosts = async () => {
    const q = query(
      collection(db, "users", currentUser.uid, "posts"),
      where("uid", "==", currentUser.uid)
    );
    const querySnapshot = await getDocs(q);

    let dbdata = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      dbdata = [...dbdata, { id: doc.id, data: doc.data() }];
    });

    return dbdata;
  };

  const getAllPosts = async () => {
    let dbdata = [];
    const querySnapshot = await getDocs(collectionGroup(db, "posts"));
    querySnapshot.forEach((doc) => {
      dbdata = [...dbdata, { id: doc.id, data: doc.data() }];
    });
    return dbdata;
  };

  const getApprovedPosts = async () => {
    let dbdata = [];
    const q = query(collection(db, "approvedposts"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      dbdata = [...dbdata, { id: doc.id, data: doc.data() }];
    });
    setData(dbdata);
  };

  const deleteAPost = async (uid, id) => {
    await deleteDoc(doc(db, "users", uid, "posts", id));
  };

  const updateAPost = async (uid, id, text) => {
    await updateDoc(doc(db, "users", uid, "posts", id), { text: text });
  };

  const approveAPost = async (uid, id, currentValue) => {
    await updateDoc(doc(db, "users", uid, "posts", id), {
      approved: !currentValue,
    });
    const docRef = doc(db, "users", uid, "posts", id);
    const docSnap = await getDoc(docRef);

    currentValue
      ? await deleteDoc(doc(db, "approvedposts", id))
      : await setDoc(doc(db, "approvedposts", id), docSnap.data());
  };
  const value = {
    approveAPost,
    data,
    addPost,
    getAllPosts,
    getPosts,
    getApprovedPosts,
    deleteAPost,
    updateAPost,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}
