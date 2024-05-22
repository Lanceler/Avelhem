import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./MyRepertoires.css";

import GoldFrame from "../assets/others/GoldFrame.png";

import { useAuthContext } from "../hooks/useAuthContext";

import { db } from "../config/firebaseConfig";

import Loading from "../components/modals/Loading";

import {
  collection,
  doc,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

export default function MyRepertoires() {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

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
        } else {
          console.log("Document does not exist");
        }
      });
    }

    return () => unsubscribe?.();
  }, [documentId]);
  //---Realtime data functionality above

  return (
    <div className="repertoires-body">
      <div>
        <div className="threeColumn">
          {userData &&
            userData.repertoire.map((rep, index) => (
              <Link
                to={`/repertoire/${index}`}
                className="repertoire-link"
                key={index}
              >
                <div
                  // key={index}
                  className="customChoice"
                  style={{ backgroundImage: `url(${GoldFrame})` }}
                >
                  <div className="repertoire-frame">
                    <div className="repertoire-text repertoire-name">
                      <h3>{rep.name}</h3>
                    </div>

                    <div className="repertoire-text repertoire-desc repertoire-scrollable">
                      {rep.description}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {isLoading && <Loading />}
    </div>
  );
}
