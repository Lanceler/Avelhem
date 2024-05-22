import React, { useEffect, useState } from "react";

import "./MyRepertoires.css";
import "./Repertoire.css";

import { useParams, useNavigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import { db } from "../config/firebaseConfig";

import { AnimatePresence } from "framer-motion";

import { useCardDatabase } from "../hooks/useCardDatabase";

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

export default function Repertoire() {
  //   const params = useParams();  // destructure instead
  const { id } = useParams(); //note: id was entered as the parameter in the routes of App.jsx
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const { avelhemCardList, skillCardList, getAvelhemIndex, getSkillIndex } =
    useCardDatabase();
  const [skillCardPool, setSkillCardPool] = useState(skillCardList);
  const [skillRepertoire, setSkillRepertoire] = useState([]);
  const [avelhemCardPool, setAvelhemCardPool] = useState(avelhemCardList);
  const [avelhemRepertoire, setAvelhemRepertoire] = useState([]);

  const [repertoireName, setRepertoireName] = useState("");
  const [repertoireDescription, setRepertoireDescription] = useState("");
  const [saveError, setSaveError] = useState("");

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
      //   let cardPoolIndex = i - 1;
      let cardPoolIndex = getAvelhemIndex(i);

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

  const handleSave = async (e) => {
    e.preventDefault();

    const hasSpecialCharacter = (inputString) => {
      const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
      return specialCharacterRegex.test(inputString);
    };

    if (repertoireName.length > 30 || hasSpecialCharacter(repertoireName)) {
      setSaveError(
        "Repertoire name must have a length of 30 characters or less and contain no special characters."
      );
    } else if (repertoireDescription.length > 150) {
      setSaveError("Description must have a length of 150 characters or less.");
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
          console.log("EDITED");
          const updatedRepertoire = [...results.repertoire];

          updatedRepertoire[id].avelhemRepertoire = getAvelhemIndexes();
          updatedRepertoire[id].skillRepertoire = getSkillIndexes();
          updatedRepertoire[id].name = repertoireName;
          updatedRepertoire[id].description = repertoireDescription;

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
      if (![0, 1, 2].includes(id * 1)) {
        console.log(id);
        navigate("/repertoires");
      } else {
        handleReloadAvelhem();
        handleReloadSkill();
        setRepertoireName(userData.repertoire[id].name);
        setRepertoireDescription(userData.repertoire[id].description);
      }
    }
  }, [userData]);

  //---Realtime data functionality above

  return (
    <div>
      {/* <div>Repertoire: {id}</div>
      {userData && userData.repertoire[id].name} */}

      <div className="repertoire-input-box">
        <form>
          <div className="repertoire-input">
            <input
              className="repertoire-input-name"
              required
              type="text"
              onChange={(e) => setRepertoireName(e.target.value)}
              value={repertoireName}
              placeholder="Repertoire Name (Max. 30 characters)"
            />

            {/* <span>Repertoire Name</span> */}
            <i></i>
          </div>

          <div className="repertoire-input">
            <textarea
              className="repertoire-input-desc"
              required
              type="text"
              onChange={(e) => setRepertoireDescription(e.target.value)}
              value={repertoireDescription}
              placeholder="Description (Max. 150 characters)"
            />
          </div>

          <button
            className="repertoire-button repertoire-save"
            // onClick={() => handleSave()}
            onClick={handleSave}
          >
            Save
          </button>

          {saveError && (
            <div className="repertoire-save-error">{saveError}</div>
          )}
        </form>
      </div>

      <br />
      {/* <Link to="/repertoires">
        <button>Return</button>
      </Link>

      <button onClick={() => handleSave()}>Save</button> */}

      <div className="repertoire-body">
        <div className="repertoire-main-division">
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
              <AnimatePresence

              // mode={"popLayout"}
              >
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

        <div className="repertoire-main-division">
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
              <AnimatePresence
              // mode={"popLayout"}
              >
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
