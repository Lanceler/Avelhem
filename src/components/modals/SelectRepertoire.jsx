import React, { useState, useEffect } from "react";
import "./Modal.css";

import { useAuthContext } from "../../hooks/useAuthContext";
import { db } from "../../config/firebaseConfig";

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

export default function SelectRepertoire(props) {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [documentId, setDocumentId] = useState(null);
  const [repertoireList, setRepertoireList] = useState(null);

  //---Realtime data functionality below
  const userInfoRef = query(
    collection(db, "userInfo"),
    where("userId", "==", user.uid)
  );

  useEffect(() => {
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

  useEffect(() => {
    let unsubscribe;
    if (documentId) {
      let documentRef = doc(db, "userInfo", documentId);

      unsubscribe = onSnapshot(documentRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setRepertoireList(docSnapshot.data().repertoire);
          console.log("Change!");
        } else {
          console.log("Document does not exist");
        }
      });
    }

    //---Realtime data functionality above

    return () => unsubscribe?.();
  }, [documentId]);

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h1>Select your repertoire.</h1>

        <div>
          {repertoireList &&
            repertoireList.map((rep, index) => (
              <div key={index}>
                <button onClick={() => props.onSelectRepertoire(rep)}>
                  {rep.name}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
