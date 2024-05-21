import React, { useEffect, useState } from "react";

import "./MyRepertoires.css";
import "./Repertoire.css";

import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useCardDatabase } from "../hooks/useCardDatabase";

import { useAuthContext } from "../hooks/useAuthContext";
import { db } from "../config/firebaseConfig";
import { AnimatePresence } from "framer-motion";

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

import CPSkillCard from "../components/createRepertoire/CPSkillCard";
import SRSkillCard from "../components/createRepertoire/SRSkillCard";
import CPAvelhemCard from "../components/createRepertoire/CPAvelhemCard";
import ARAvelhemCard from "../components/createRepertoire/ARAvelhemCard";
import DisplayedCard from "../components/displays/DisplayedCard";

export default function Repertoire() {
  //   const params = useParams();  // destructure instead
  const { id } = useParams(); //note: id was entered as the parameter in the routes of App.jsx
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const { avelhemCardList, skillCardList, getAvelhemById, getSkillById } =
    useCardDatabase();
  const [skillCardPool, setSkillCardPool] = useState(skillCardList);
  const [skillRepertoire, setSkillRepertoire] = useState([]);
  const [avelhemCardPool, setAvelhemCardPool] = useState(avelhemCardList);
  const [avelhemRepertoire, setAvelhemRepertoire] = useState([]);

  const [repertoireName, setRepertoireName] = useState("");
  const [saveError, setSaveError] = useState("");

  const [displayCard, setDisplayCard] = useState(null);

  const navigate = useNavigate();

  const addToAvelhemRepertoire = (cardPoolIndex) => {
    if (
      avelhemRepertoire.length < 20 &&
      avelhemCardPool[cardPoolIndex].Stock > 0
    ) {
      let newAvelhemRepertoire = [...avelhemRepertoire];
      newAvelhemRepertoire.push({
        Name: avelhemCardList[cardPoolIndex].Name,
        CardId: avelhemCardList[cardPoolIndex].CardId,
        CardPoolIndex: cardPoolIndex,
      });

      newAvelhemRepertoire.sort((a, b) => a.CardPoolIndex - b.CardPoolIndex);
      setAvelhemRepertoire(newAvelhemRepertoire);

      let newCardPool = [...avelhemCardPool];
      newCardPool[cardPoolIndex].Stock--;
      setAvelhemCardPool(newCardPool);
    }
  };

  const returnToAvelhemCardPool = (avelhemCardIndex, cardPoolIndex) => {
    let newAvelhemRepertoire = [...avelhemRepertoire];
    newAvelhemRepertoire.splice(avelhemCardIndex, 1);
    setAvelhemRepertoire(newAvelhemRepertoire);
    let newCardPool = [...avelhemCardPool];
    newCardPool[cardPoolIndex].Stock++;
    setAvelhemCardPool(newCardPool);
  };

  const getAvelhemIndexes = () => {
    let avelhemIndexes = [];

    for (let i = 0; i < avelhemRepertoire.length; i++) {
      avelhemIndexes.push(avelhemRepertoire[i].CardId);
    }
    return avelhemIndexes;
  };

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

  const handleClearAvelhem = () => {
    let newCardPool = [...avelhemCardPool];

    for (let i = avelhemRepertoire.length - 1; i >= 0; i--) {
      newCardPool[avelhemRepertoire[i].CardPoolIndex].Stock++;
    }

    setAvelhemRepertoire([]);
    setAvelhemCardPool(newCardPool);
  };

  return (
    <div>
      <div>Repertoire: {id}</div>
      {userData && userData.repertoire[id].name}

      <br />
      <Link to="/repertoires">
        <button>Return</button>
      </Link>

      <div className="repertoire-body">
        <div className="main-division">
          <div className="division">
            <div className="repertoire-text">
              Avelhem Repertoire: {avelhemRepertoire.length} / 20{" "}
              <button onClick={() => handleClearAvelhem()}>Clear</button>
            </div>

            <div className="avelhem-repertoire">
              {avelhemRepertoire.map((card, index) => (
                <ARAvelhemCard
                  key={index}
                  index={index}
                  cardInfo={card}
                  returnToAvelhemCardPool={returnToAvelhemCardPool}
                />
              ))}
            </div>
          </div>

          <div className="division">
            <div className="repertoire-text">Avelhem Selection</div>

            <div className="avelhem-selection">
              {avelhemCardPool.map((card, index) => (
                <CPAvelhemCard
                  key={index}
                  index={index}
                  cardInfo={card}
                  addToAvelhemRepertoire={addToAvelhemRepertoire}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {isLoading && <Loading />}
    </div>
  );
}
