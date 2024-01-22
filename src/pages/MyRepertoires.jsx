import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./MyRepertoires.css";

import { useAuthContext } from "../hooks/useAuthContext";

import { db } from "../config/firebaseConfig";

import YesNo from "../components/modals/YesNo";

import {
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function MyRepertoires() {
  const [isLoading, setIsLoading] = useState(false);
  const [refresher, setRefresher] = useState(false);
  const [showYesNo, setShowYesNo] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [indexToDelete, setIndexToDelete] = useState(null);

  const { user } = useAuthContext();

  const userInfoRef = query(
    collection(db, "userInfo"),
    where("userId", "==", user.uid)
  );

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getDocs(userInfoRef)
      .then((snapshot) => {
        if (snapshot.empty) {
          throw new Error("No user found");
        } else {
          let results = null;
          const UserDoc = snapshot.docs[0];
          results = { ...UserDoc.data() };

          setUserData(results);
          setIsLoading(false);
          console.log({ ...UserDoc.data() });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [refresher]);

  const onDelete = async (index) => {
    setShowYesNo(true);
    setIndexToDelete(index);
  };

  useEffect(() => {
    if (confirmDelete) {
      if (!isLoading) {
        setIsLoading(true);
        let updatedRepertoire = [...userData.repertoire];
        updatedRepertoire.splice(indexToDelete, 1);

        const userDoc = doc(db, "userInfo", userData.id);

        try {
          updateDoc(userDoc, { repertoire: updatedRepertoire });
          setRefresher(!refresher);
        } catch (err) {
          console.error(err);
        }
        setIsLoading(false);
      }
    }
  }, [confirmDelete]);

  const getResponse = (resp) => {
    setConfirmDelete(resp);
    setShowYesNo(false);
  };

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
    </div>
  );
}
