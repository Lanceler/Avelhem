import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./MyRepertoires.scss";
import "./Repertoire.css";

import { useAuthContext } from "../hooks/useAuthContext";
import { db } from "../config/firebaseConfig";

import { AnimatePresence } from "framer-motion";
import { useCardDatabase } from "../hooks/useCardDatabase";

import Loading from "../components/modals/Loading";
import { useSelector, useDispatch } from "react-redux";
import ZoomCard from "../components/displays/ZoomCard";

import { updateMagnifiedSkill } from "../redux/magnifySkill";

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

import { useGetImages } from "../hooks/useGetImages";

export default function Repertoire() {
  //   const params = useParams();  // destructure instead
  const { id } = useParams(); //note: id was entered as the parameter in the routes of App.jsx
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const { magnifiedSkill } = useSelector((state) => state.magnifiedSkill);
  const dispatch = useDispatch();

  const {
    avelhemCardList,
    skillCardList,
    skillCardListExpansion,
    getAvelhemIndex,
    getSkillIndex,
  } = useCardDatabase();
  const [skillCardPool, setSkillCardPool] = useState(skillCardList);
  const [skillRepertoire, setSkillRepertoire] = useState([]);
  const [avelhemCardPool, setAvelhemCardPool] = useState(avelhemCardList);
  const [avelhemRepertoire, setAvelhemRepertoire] = useState([]);

  const [repertoireName, setRepertoireName] = useState("");
  const [repertoireDescription, setRepertoireDescription] = useState("");
  const [saveError, setSaveError] = useState("");

  const [showAvelhemSelection, setShowAvelhemSelection] = useState(false);
  const [showSkillSelection, setShowSkillSelection] = useState(false);

  const { getBannerImage } = useGetImages();

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

    const userRepertoire =
      id <= 3 ? userData.repertoire[id - 1] : userData.repertoire2[id - 1 - 3];

    for (let i of userRepertoire.avelhemRepertoire) {
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

    let newSkillRepertoire = [];
    let newCardPool = [...skillCardPool];

    const userRepertoire =
      id <= 3 ? userData.repertoire[id - 1] : userData.repertoire2[id - 1 - 3];

    for (let i of userRepertoire.skillRepertoire) {
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
        "Name must have a length of 30 characters or less and contain no special characters."
      );
    } else if (repertoireDescription.length > 200) {
      setSaveError("Description must have a length of 200 characters or less.");
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
          if (id <= 3) {
            const updatedRepertoire = [...results.repertoire];

            updatedRepertoire[id - 1].avelhemRepertoire = getAvelhemIndexes();
            updatedRepertoire[id - 1].skillRepertoire = getSkillIndexes();
            updatedRepertoire[id - 1].name = repertoireName;
            updatedRepertoire[id - 1].description = repertoireDescription;

            const userDoc = doc(db, "userInfo", results.id);
            updateDoc(userDoc, { repertoire: updatedRepertoire });
          } else {
            const updatedRepertoire = [...results.repertoire2];

            updatedRepertoire[id - 1 - 3].avelhemRepertoire =
              getAvelhemIndexes();
            updatedRepertoire[id - 1 - 3].skillRepertoire = getSkillIndexes();
            updatedRepertoire[id - 1 - 3].name = repertoireName;
            updatedRepertoire[id - 1 - 3].description = repertoireDescription;

            const userDoc = doc(db, "userInfo", results.id);
            updateDoc(userDoc, { repertoire2: updatedRepertoire });
          }

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
    dispatch(updateMagnifiedSkill(null));
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
        // console.log(err);
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
          // console.log("Data was updated");
        } else {
          // console.log("Document does not exist");
        }
      });
    }

    return () => unsubscribe?.();
  }, [documentId]);

  useEffect(() => {
    if (userData) {
      if (![1, 2, 3, 4, 5, 6].includes(id * 1)) {
        // console.log(id);
        navigate("/repertoires");
      } else {
        handleReloadAvelhem();
        handleReloadSkill();

        if (id <= 3) {
          setRepertoireName(userData.repertoire[id - 1].name);
          setRepertoireDescription(userData.repertoire[id - 1].description);
        } else {
          setRepertoireName(userData.repertoire2[id - 1 - 3].name);
          setRepertoireDescription(
            userData.repertoire2[id - 1 - 3].description
          );
        }
      }
    }
  }, [userData]);

  //---Realtime data functionality above

  return (
    <div
      className="repertoire-body"
      style={{
        backgroundImage: `url(${getBannerImage("PlantBG")})`,
      }}
    >
      <div className="repertoire-input-box">
        <form>
          <div className="repertoire-input">
            <input
              className="repertoire-input-name"
              required
              type="text"
              onChange={(e) => setRepertoireName(e.target.value)}
              value={repertoireName}
              placeholder="Name (Max. 30 chars.)"
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
              placeholder="Description (Max. 200 chars.)"
            />
          </div>

          <button
            className="repertoire-button repertoire-save"
            onClick={handleSave}
          >
            Save
          </button>

          {saveError && (
            <div className="repertoire-save-error">
              <strong>{saveError}</strong>
            </div>
          )}
        </form>
      </div>

      <br />

      <div className="repertoire-content">
        <div className="repertoire-main-division">
          <div
            // className="repertoire-division"

            className={`repertoire-division 
              ${
                !showAvelhemSelection ? "selection-shown" : "selection-hidden"
              }`}
          >
            <div className="repertoire-header">
              <div className="">
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

                <button
                  className="repertoire-button repertoire-show-selection"
                  onClick={() => setShowAvelhemSelection(true)}
                >
                  View Selection
                </button>
              </div>
            </div>

            <div className="avelhem-repertoire">
              <AnimatePresence
                className="repertoire-selection-card"
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

          <div
            className={`repertoire-division repertoire-selection ${
              showAvelhemSelection ? "selection-shown" : "selection-hidden"
            }`}
          >
            <div className="repertoire-header">
              <div className="">Avelhem Selection</div>
              <div className="repertoire-buttons">
                <button
                  className="repertoire-button repertoire-show-selection"
                  onClick={() => setShowAvelhemSelection(false)}
                  style={{ marginLeft: 0 }}
                >
                  View Repertoire
                </button>
              </div>
            </div>

            <div className="avelhem-selection">
              {avelhemCardPool.map((card, index) => (
                <div
                  style={{
                    display: id < 4 && card.CardId > 8 ? "none" : "block",
                  }}
                >
                  <CPAvelhemCard
                    key={index}
                    index={index}
                    cardInfo={card}
                    addToAvelhemRepertoire={addToAvelhemRepertoire}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="repertoire-main-division">
          <div
            // className="repertoire-division"

            className={`repertoire-division 
              ${!showSkillSelection ? "selection-shown" : "selection-hidden"}`}
          >
            <div className="repertoire-header">
              <div className="">
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

                <button
                  className="repertoire-button repertoire-show-selection"
                  onClick={() => setShowSkillSelection(true)}
                >
                  View Selection
                </button>
              </div>
            </div>

            <div className="skill-repertoire">
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

          <div
            className={`repertoire-division repertoire-selection ${
              showSkillSelection ? "selection-shown" : "selection-hidden"
            }`}
          >
            <div className="repertoire-header">
              <div className="">Skill Selection</div>
              <div className="repertoire-buttons">
                <button
                  className="repertoire-button repertoire-show-selection"
                  onClick={() => setShowSkillSelection(false)}
                  style={{ marginLeft: 0 }}
                >
                  View Repertoire
                </button>
              </div>
            </div>

            <div className="skill-selection">
              {skillCardPool.map((card, index) => (
                <div
                  style={{
                    display:
                      id < 4 && skillCardListExpansion.includes(card.CardId)
                        ? "none"
                        : "block",
                  }}
                >
                  <CPSkillCard
                    key={index}
                    index={index}
                    cardInfo={card}
                    addToSkillRepertoire={addToSkillRepertoire}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isLoading && <Loading />}
      {magnifiedSkill && (
        <ZoomCard cardInfo={magnifiedSkill} repertoire={true} />
      )}
    </div>
  );
}
