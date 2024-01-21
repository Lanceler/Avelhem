import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./MyRepertoires.css";

import { useAuthContext } from "../hooks/useAuthContext";

import { db } from "../config/firebaseConfig";

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
  const { user } = useAuthContext();

  const userInfoRef = query(
    collection(db, "userInfo"),
    where("userId", "==", user.uid)
  );

  const [userData, setUserData] = useState(null);

  getDocs(userInfoRef)
    .then((snapshot) => {
      if (snapshot.empty) {
        // setError("No exam found.");
        // setIsLoading(false);
      } else {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data() });
        });
        setUserData(results[0]);
        // setIsLoading(false);
      }
    })
    .catch((err) => {
      // setError(err.message);
      // setIsLoading(false);
    });

  return (
    <div>
      {/* {userData && <p>{userData.repertoire[0].name}</p>} */}

      <div>
        {userData &&
          userData.repertoire.map((rep, index) => (
            <div key={index} className="repertoire-box">
              <h2>{rep.name}</h2>
              <button>Edit</button>
            </div>
          ))}
      </div>

      <Link to="/create-repertoire">
        <button>Create Repertoire</button>
      </Link>
    </div>
  );
}
