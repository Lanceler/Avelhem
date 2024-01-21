import React, { useState } from "react";
import { Link } from "react-router-dom";

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

  var userInfoRef = collection(db, "userInfo");
  userInfoRef = query(userInfoRef, where("userId", "==", user.uid));

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
            <div key={index}>
              <h2>{rep.name}</h2>
            </div>
          ))}
      </div>

      <Link to="/create-repertoire">
        <button>Create Repertoire</button>
      </Link>
    </div>
  );
}
