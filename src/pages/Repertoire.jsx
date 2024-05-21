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

  const { avelhemCardList, skillCardList, getAvelhemById, getSkillIndex } =
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
        timeAdded: new Date(),
      });

      newAvelhemRepertoire.sort((a, b) => a.CardPoolIndex - b.CardPoolIndex);
      setAvelhemRepertoire(newAvelhemRepertoire);

      let newCardPool = [...avelhemCardPool];
      newCardPool[cardPoolIndex].Stock--;
      setAvelhemCardPool(newCardPool);
    }
  };

  const addToSkillRepertoire = (cardPoolIndex) => {
    if (skillRepertoire.length < 60 && skillCardPool[cardPoolIndex].Stock > 0) {
      let newSkillRepertoire = [...skillRepertoire];
      newSkillRepertoire.push({
        Name: skillCardList[cardPoolIndex].Name,
        CardId: skillCardList[cardPoolIndex].CardId,
        CardPoolIndex: cardPoolIndex,
        timeAdded: new Date(),
      });

      newSkillRepertoire.sort((a, b) => a.CardPoolIndex - b.CardPoolIndex);
      setSkillRepertoire(newSkillRepertoire);

      let newCardPool = [...skillCardPool];
      newCardPool[cardPoolIndex].Stock--;
      setSkillCardPool(newCardPool);
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

  const returnToSkillCardPool = (cardInfo, index) => {
    if (true) {
      let newSkillRepertoire = [...skillRepertoire];
      newSkillRepertoire.splice(index, 1);
      setSkillRepertoire(newSkillRepertoire);

      let newCardPool = [...skillCardPool];

      let limit = skillCardList[cardInfo.CardPoolIndex].Stock;
      newCardPool[cardInfo.CardPoolIndex].Stock = Math.min(
        newCardPool[cardInfo.CardPoolIndex].Stock + 1,
        limit
      );
      setSkillCardPool(newCardPool);
    }
  };

  const getAvelhemIndexes = () => {
    let avelhemIndexes = [];

    for (let i = 0; i < avelhemRepertoire.length; i++) {
      avelhemIndexes.push(avelhemRepertoire[i].CardId);
    }
    return avelhemIndexes;
  };

  const getSkillIndexes = () => {
    let skillIndexes = [];

    for (let i = 0; i < skillRepertoire.length; i++) {
      skillIndexes.push(skillRepertoire[i].CardId);
    }
    return skillIndexes;
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

  useEffect(() => {
    if (userData) {
      handleReloadAvelhem();
      handleReloadSkill();
    }
  }, [userData]);

  //---Realtime data functionality above

  const handleClearAvelhem = () => {
    let newCardPool = [...avelhemCardPool];
    for (let i = avelhemRepertoire.length - 1; i >= 0; i--) {
      newCardPool[avelhemRepertoire[i].CardPoolIndex].Stock++;
    }
    setAvelhemRepertoire([]);
    setAvelhemCardPool(newCardPool);
  };

  const handleClearSkill = () => {
    let newCardPool = [...skillCardPool];
    for (let i = skillRepertoire.length - 1; i >= 0; i--) {
      newCardPool[skillRepertoire[i].CardPoolIndex].Stock++;
    }
    setSkillRepertoire([]);
    setSkillCardPool(newCardPool);
  };

  const handleReloadAvelhem = () => {
    handleClearAvelhem();

    const fixedArray = [];

    for (let i = 0; i < 20; i++) {
      fixedArray.push(i);
    }

    // console.log(userData.repertoire[id].avelhemRepertoire);

    let newAvelhemRepertoire = [];
    let newCardPool = [...avelhemCardPool];
    for (let i of userData.repertoire[id].avelhemRepertoire) {
      let cardPoolIndex = i - 1;
      newAvelhemRepertoire.push({
        Name: avelhemCardList[cardPoolIndex].Name,
        CardId: avelhemCardList[cardPoolIndex].CardId,
        CardPoolIndex: cardPoolIndex,
        timeAdded: JSON.stringify(new Date()) + fixedArray.pop(), // needed to be 100% unique,
      });

      newAvelhemRepertoire.sort((a, b) => a.CardPoolIndex - b.CardPoolIndex);

      newCardPool[cardPoolIndex].Stock--;
    }
    setAvelhemRepertoire(newAvelhemRepertoire);
    setAvelhemCardPool(newCardPool);
  };

  const handleReloadSkill = () => {
    handleClearSkill();

    const fixedArray = [];

    for (let i = 0; i < 60; i++) {
      fixedArray.push(i);
    }

    // console.log(userData.repertoire[id].skillRepertoire);

    let newSkillRepertoire = [];
    let newCardPool = [...skillCardPool];
    for (let i of userData.repertoire[id].skillRepertoire) {
      let cardPoolIndex = getSkillIndex(i);

      newSkillRepertoire.push({
        Name: skillCardList[cardPoolIndex].Name,
        CardId: skillCardList[cardPoolIndex].CardId,
        CardPoolIndex: cardPoolIndex,
        timeAdded: JSON.stringify(new Date()) + fixedArray.pop(), // needed to be 100% unique,
      });

      newSkillRepertoire.sort((a, b) => a.CardPoolIndex - b.CardPoolIndex);

      newCardPool[cardPoolIndex].Stock--;
    }
    setSkillRepertoire(newSkillRepertoire);
    setSkillCardPool(newCardPool);
  };

  const handleSave = async () => {
    const repertoireNameTrimmed = repertoireName.trim();

    if (
      repertoireNameTrimmed.length > 40 ||
      hasSpecialCharacter(repertoireNameTrimmed)
    ) {
      setSaveError(
        "Repertoire name must have a length of 40 or less and contain no special characters."
      );
    } else if (
      skillRepertoire.length !== 60 ||
      avelhemRepertoire.length !== 20
    ) {
      setSaveError(
        "Avelhem & skill repertoires must have 20 and 60 cards, respectively."
      );
    } else {
      setIsLoading(true);
      setSaveError("");

      const userInfoRef = query(
        collection(db, "userInfo"),
        where("userId", "==", user.uid)
      );

      let results = null;

      getDocs(userInfoRef)
        .then((snapshot) => {
          if (snapshot.empty) {
            throw new Error("No user found.");
          } else {
            const UserDoc = snapshot.docs[0];
            results = { ...UserDoc.data() };
          }
        })
        .then(() => {
          const updatedRepertoire = [...results.repertoire];

          updatedRepertoire[id].avelhemRepertoire = getAvelhemIndexes();
          updatedRepertoire[id].skillRepertoire = getSkillIndexes();

          const userDoc = doc(db, "userInfo", results.id);
          updateDoc(userDoc, { repertoire: updatedRepertoire });

          navigate("/repertoires");
        })
        .catch((err) => {
          console.log(err);
        });

      setIsLoading(false);
    }
  };

  function hasSpecialCharacter(inputString) {
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return specialCharacterRegex.test(inputString);
  }

  return (
    <div>
      <div>Repertoire: {id}</div>
      {userData && userData.repertoire[id].name}

      <br />
      <Link to="/repertoires">
        <button>Return</button>
      </Link>

      <button onClick={() => handleSave()}>Save</button>

      <div className="repertoire-body">
        <div className="main-division">
          <div className="repertoire-division">
            <div className="repertoire-header">
              <div className="repertoire-text">
                Avelhem Repertoire ({avelhemRepertoire.length} / 20)
              </div>
              <div className="repertoire-buttons">
                <button
                  className="repertoire-button"
                  onClick={() => handleReloadAvelhem()}
                >
                  Reload
                </button>
                <button
                  className="repertoire-button"
                  onClick={() => handleClearAvelhem()}
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="avelhem-repertoire">
              <AnimatePresence mode={"popLayout"}>
                {avelhemRepertoire.map((card, index) => (
                  <ARAvelhemCard
                    key={JSON.stringify({ c: card })}
                    index={index}
                    cardInfo={card}
                    returnToAvelhemCardPool={returnToAvelhemCardPool}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="repertoire-division">
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

        {/* rfgergergerg */}

        <div className="main-division">
          <div className="repertoire-division">
            <div className="repertoire-header">
              <div className="repertoire-text">
                Skill Repertoire ({skillRepertoire.length} / 60)
              </div>
              <div className="repertoire-buttons">
                <button
                  className="repertoire-button"
                  onClick={() => handleReloadSkill()}
                >
                  Reload
                </button>
                <button
                  className="repertoire-button"
                  onClick={() => handleClearSkill()}
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="skill-repertoire repertoire-scrollable">
              <AnimatePresence mode={"popLayout"}>
                {skillRepertoire.map((card, index) => (
                  <SRSkillCard
                    key={JSON.stringify({ c: card })}
                    index={index}
                    cardInfo={card}
                    returnToSkillCardPool={returnToSkillCardPool}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="repertoire-division">
            <div className="repertoire-text">Skill Selection</div>

            <div className="skill-selection repertoire-scrollable">
              {skillCardPool.map((card, index) => (
                <CPSkillCard
                  key={index}
                  index={index}
                  cardInfo={card}
                  addToSkillRepertoire={addToSkillRepertoire}
                  //   selectViewCard={selectViewCard}
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
