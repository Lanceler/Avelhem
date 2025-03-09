import React, { useState, useEffect } from "react";
import "./Modal.css";
import "./Modal2.scss";

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
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [selectedRep, setSelectedRep] = useState(null);
  const [expansion, setExpansion] = useState("Elemental Entree");

  // console.log(props.expansion);

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
          if (props.expansion === "Familiars’ Followup") {
            setRepertoireList(docSnapshot.data().repertoire2);
            setExpansion("Familiars’ Followup");
          } else {
            setRepertoireList(docSnapshot.data().repertoire);
          }
        } else {
          console.log("Document does not exist");
        }
      });
    }

    //---Realtime data functionality above

    return () => unsubscribe?.();
  }, [documentId]);

  useEffect(() => {
    let unsubscribe;
    if (documentId) {
      let documentRef = doc(db, "userInfo", documentId);

      unsubscribe = onSnapshot(documentRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          if (expansion === "Familiars’ Followup") {
            setRepertoireList(docSnapshot.data().repertoire2);
          } else {
            setRepertoireList(docSnapshot.data().repertoire);
          }
          setSelectedRep(null);
          setSelectedChoice(null);
        } else {
          console.log("Document does not exist");
        }
      });
    }

    //---Realtime data functionality above

    return () => unsubscribe?.();
  }, [expansion]);

  const switchExpansion = () => {
    if (expansion === "Familiars’ Followup") {
      setExpansion("Elemental Entree");
    } else {
      setExpansion("Familiars’ Followup");
    }
  };

  const handleChoice = (i, rep) => {
    if (selectedChoice === i) {
      setSelectedRep(null);
      setSelectedChoice(null);
    } else {
      setSelectedRep(rep);
      setSelectedChoice(i);
    }
  };

  const handleSelect = () => {
    props.onSelectRepertoire(selectedRep);
  };

  return (
    <div className="modalBackdrop">
      <div className="modalV2">
        <div className="modalHeader2">
          <div className="modalTitle2">Select Your Repertoire</div>
        </div>

        <div className="modalContent2">
          <div className="modalContentText">
            Repertoire Selection: {expansion}
          </div>

          <div className="modalContent3Column">
            {repertoireList?.map((rep, i) => (
              <div
                key={i}
                className={`
                modalOptionOutline 
                modalRepertoireOptionOutline ${
                  selectedChoice === i
                    ? "modalRepertoireOptionOutlineSelected"
                    : ""
                }
                `}
                onClick={() => {
                  handleChoice(i, rep);
                }}
              >
                <div className="modalRepertoire">
                  <div className="modalOptionHeader">
                    <div className="modalOptionTitle">{rep.name}</div>
                  </div>

                  <div className="repertoire-text repertoire-desc repertoire-scrollable">
                    {rep.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modalFooter">
          {selectedChoice !== null && (
            <button
              className={`redButton2`}
              onClick={() => {
                handleSelect();
              }}
            >
              Select
            </button>
          )}
          {props.expansion === "Familiars’ Followup" && (
            <button className={`redButton2`} onClick={() => switchExpansion()}>
              Switch Selection
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
