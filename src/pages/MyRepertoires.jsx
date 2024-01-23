import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./MyRepertoires.css";

import { useAuthContext } from "../hooks/useAuthContext";

import { db } from "../config/firebaseConfig";

import YesNo from "../components/modals/YesNo";
import Loading from "../components/modals/Loading";

import {
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

export default function MyRepertoires() {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [showYesNo, setShowYesNo] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [indexToDelete, setIndexToDelete] = useState(null);

  //---Realtime data functionality below
  const userInfoRef = query(
    collection(db, "userInfo"),
    where("userId", "==", user.uid)
  );

  const [documentId, setDocumentId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    getDocs(userInfoRef)
      .then((snapshot) => {
        if (snapshot.empty) {
          throw new Error("No user found");
        } else {
          const UserDoc = snapshot.docs[0];
          setDocumentId(UserDoc.data().id);

          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let unsubscribe;
    if (documentId) {
      let documentRef = doc(db, "userInfo", documentId);

      unsubscribe = onSnapshot(documentRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setUserData(docSnapshot.data());
          console.log("Change!");
        } else {
          console.log("Document does not exist");
        }
      });
    }

    return () => unsubscribe?.();
  }, [documentId]);
  //---Realtime data functionality above

  //---Delete repertoire functionality below
  useEffect(() => {
    if (confirmDelete) {
      if (!isLoading) {
        setIsLoading(true);
        let updatedRepertoire = [...userData.repertoire];
        updatedRepertoire.splice(indexToDelete, 1);

        const userDoc = doc(db, "userInfo", userData.id);

        try {
          updateDoc(userDoc, { repertoire: updatedRepertoire });
          setIsLoading(false);
        } catch (err) {
          console.error(err);
          setIsLoading(false);
        }
      }
    }
  }, [confirmDelete]);

  const onDelete = async (index) => {
    setConfirmDelete(false);
    setIndexToDelete(index);
    setShowYesNo(true);
  };

  const getResponse = (resp) => {
    setConfirmDelete(resp);
    setShowYesNo(false);
  };
  //---Delete repertoire functionality above

  return (
    <div>
      <div>
        {userData &&
          userData.repertoire.map((rep, index) => (
            <div key={index} className="repertoire-box">
              <h2>{rep.name}</h2>
              <button>View</button>
              <button onClick={() => onDelete(index)}>Delete</button>
            </div>
          ))}
      </div>

      <Link to="/create-repertoire">
        <button>Create Repertoire</button>
      </Link>
      {showYesNo && (
        <YesNo
          message="Are you sure you want to delete this repertoire?"
          getResponse={getResponse}
        />
      )}

      {isLoading && <Loading />}
    </div>
  );
}
