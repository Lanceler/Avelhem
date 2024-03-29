import "./CreateRepertoire.css";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useCardDatabase } from "../hooks/useCardDatabase";

import CPSkillCard from "../components/createRepertoire/CPSkillCard";
import SRSkillCard from "../components/createRepertoire/SRSkillCard";
import CPAvelhemCard from "../components/createRepertoire/CPAvelhemCard";
import ARAvelhemCard from "../components/createRepertoire/ARAvelhemCard";
import DisplayedCard from "../components/displays/DisplayedCard";

import Loading from "../components/modals/Loading";

import { db } from "../config/firebaseConfig";
import {
  collection,
  updateDoc,
  query,
  where,
  getDocs,
  doc,
} from "firebase/firestore";
import { useAuthContext } from "../hooks/useAuthContext";
import { AnimatePresence } from "framer-motion";

export default function CreateRepertoire() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { avelhemCardList, skillCardList, getAvelhemById, getSkillById } =
    useCardDatabase();
  const [skillCardPool, setSkillCardPool] = useState(skillCardList);
  const [skillRepertoire, setSkillRepertoire] = useState([]);
  const [avelhemCardPool, setAvelhemCardPool] = useState(avelhemCardList);
  const [avelhemRepertoire, setAvelhemRepertoire] = useState([]);

  const [repertoireName, setRepertoireName] = useState("");
  const { user } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState("");

  const [displayCard, setDisplayCard] = useState(null);

  const navigate = useNavigate();

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

  const addToAvelhemRepertoire = (cardPoolIndex) => {
    if (
      avelhemRepertoire.length < 30 &&
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

  const returnToAvelhemCardPool = (avelhemCardIndex, cardPoolIndex) => {
    let newAvelhemRepertoire = [...avelhemRepertoire];
    newAvelhemRepertoire.splice(avelhemCardIndex, 1);
    setAvelhemRepertoire(newAvelhemRepertoire);
    let newCardPool = [...avelhemCardPool];
    newCardPool[cardPoolIndex].Stock++;
    setAvelhemCardPool(newCardPool);
  };

  const selectViewCard = (card) => {
    setDisplayCard(card);
  };

  const getSkillIndexes = () => {
    let skillIndexes = [];

    for (let i = 0; i < skillRepertoire.length; i++) {
      skillIndexes.push(skillRepertoire[i].CardId);
    }
    return skillIndexes;
  };

  const getAvelhemIndexes = () => {
    let avelhemIndexes = [];

    for (let i = 0; i < avelhemRepertoire.length; i++) {
      avelhemIndexes.push(avelhemRepertoire[i].CardId);
    }
    return avelhemIndexes;
  };

  function hasSpecialCharacter(inputString) {
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return specialCharacterRegex.test(inputString);
  }

  const onSave = async () => {
    const repertoireNameTrimmed = repertoireName.trim();

    if (
      repertoireNameTrimmed.length > 20 ||
      hasSpecialCharacter(repertoireNameTrimmed)
    ) {
      setSaveError(
        "Repertoire name must have a length of 20 or less and contain no special characters."
      );
    } else if (skillRepertoire.length < 60 || avelhemRepertoire.length < 30) {
      setSaveError(
        "Skill and Avelhem repertoires must have 60 and 30 cards, respectively."
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
          if (results.repertoire.length >= 5) {
            setSaveError("Repertoire limit (5) exceeded.");
          } else {
            const newRepertoire = {
              name: repertoireName,
              skillRepertoire: getSkillIndexes(),
              avelhemRepertoire: getAvelhemIndexes(),
            };

            console.log(newRepertoire);

            const updatedRepertoire = [...results.repertoire, newRepertoire];
            const userDoc = doc(db, "userInfo", results.id);
            updateDoc(userDoc, { repertoire: updatedRepertoire });

            navigate("/repertoires");
          }
        })
        .catch((err) => {
          console.log(err);
        });

      setIsLoading(false);
    }
  };

  return (
    <div>
      <label>
        <span>Repertoire Name:</span>
        <input
          type="text"
          onChange={(e) => setRepertoireName(e.target.value)}
          value={repertoireName}
        />
      </label>
      {saveError && <div>{saveError}</div>}
      <button disabled={isLoading} onClick={onSave}>
        Save
      </button>
      <div className="main-division">
        <div className="division">
          Selected Card
          <div className="sub-divisionC">
            {displayCard && <DisplayedCard cardInfo={displayCard.CardId} />}
          </div>
        </div>

        <div className="division">
          Skill Repertoire: {skillRepertoire.length} / 60
          <div className="sub-divisionB">
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

        <div className="division">
          Card Pool
          <div className="sub-division">
            {skillCardPool.map((card, index) => (
              <CPSkillCard
                key={index}
                index={index}
                cardInfo={card}
                addToSkillRepertoire={addToSkillRepertoire}
                selectViewCard={selectViewCard}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="main-division main-division2">
        <div className="division">
          Avelhem Repertoire: {avelhemRepertoire.length} / 30
          <div className="sub-division">
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
          Card Pool
          <div className="sub-division">
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

      {isLoading && <Loading />}
    </div>
  );
}
