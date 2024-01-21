import React from "react";
import { useState, useEffect } from "react";
import "./CreateRepertoire.css";

import CPSkillCard from "../components/createRepertoire/CPSkillCard";
import SRSkillCard from "../components/createRepertoire/SRSkillCard";
import CPAvelhemCard from "../components/createRepertoire/CPAvelhemCard";
import ARAvelhemCard from "../components/createRepertoire/ARAvelhemCard";
import { useCardDatabase } from "../hooks/useCardDatabase";

import { db } from "../config/firebaseConfig";
import { addDoc } from "firebase/firestore";

export default function CreateRepertoire() {
  const { avelhemCardList, skillCardList } = useCardDatabase();
  const [skillCardPool, setSkillCardPool] = useState(skillCardList);
  const [skillRepertoire, setSkillRepertoire] = useState([]);
  const [avelhemCardPool, setAvelhemCardPool] = useState(avelhemCardList);
  const [avelhemRepertoire, setAvelhemRepertoire] = useState([]);

  const [loading, setLoading] = useState(false);

  const addToSkillRepertoire = (skillCardId) => {
    if (
      skillRepertoire.length < 60 &&
      skillCardPool[skillCardId - 1].Stock > 0
    ) {
      let newSkillRepertoire = [...skillRepertoire];
      newSkillRepertoire.push(skillCardList[skillCardId - 1]);

      newSkillRepertoire.sort((a, b) => a.CardId - b.CardId);
      setSkillRepertoire(newSkillRepertoire);

      let newCardPool = [...skillCardPool];
      newCardPool[skillCardId - 1].Stock--;
      setSkillCardPool(newCardPool);
    }
  };

  const returnToSkillCardPool = (skillCardIndex, skillCardId) => {
    let newSkillRepertoire = [...skillRepertoire];
    newSkillRepertoire.splice(skillCardIndex, 1);
    setSkillRepertoire(newSkillRepertoire);
    let newCardPool = [...skillCardPool];
    newCardPool[skillCardId - 1].Stock++;
    setSkillCardPool(newCardPool);
  };

  const addToAvelhemRepertoire = (avelhemCardId) => {
    if (
      avelhemRepertoire.length < 60 &&
      avelhemCardPool[avelhemCardId - 1].Stock > 0
    ) {
      let newAvelhemRepertoire = [...avelhemRepertoire];
      newAvelhemRepertoire.push(avelhemCardList[avelhemCardId - 1]);

      newAvelhemRepertoire.sort((a, b) => a.CardId - b.CardId);
      setAvelhemRepertoire(newAvelhemRepertoire);

      let newCardPool = [...avelhemCardPool];
      newCardPool[avelhemCardId - 1].Stock--;
      setAvelhemCardPool(newCardPool);
    }
  };

  const returnToAvelhemCardPool = (avelhemCardIndex, avelhemCardId) => {
    let newAvelhemRepertoire = [...avelhemRepertoire];
    newAvelhemRepertoire.splice(avelhemCardIndex, 1);
    setAvelhemRepertoire(newAvelhemRepertoire);
    let newCardPool = [...avelhemCardPool];
    newCardPool[avelhemCardId - 1].Stock++;
    setAvelhemCardPool(newCardPool);
  };

  const onSave = () => {};

  return (
    <div>
      CreateRepertoire
      <div className="main-division">
      <div className="division">
        Selected Card
            <div className="sub-divisionC">
            //To change
          </div>
      </div>

        <div className="division">
          Skill Repertoire: {skillRepertoire.length} / 60
          <div className="sub-divisionB">
            {skillRepertoire.map((card, index) => (
              <SRSkillCard
                key={index}
                index={index}
                cardInfo={card}
                returnToSkillCardPool={returnToSkillCardPool}
              />
            ))}
          </div>
        </div>

        <div className="division">
          Card Pool
          <div className="sub-division">
            {skillCardPool.map((card, index) => (
              <CPSkillCard
                key={index}
                cardInfo={card}
                addToSkillRepertoire={addToSkillRepertoire}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="main-division">
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
                cardInfo={card}
                addToAvelhemRepertoire={addToAvelhemRepertoire}
              />
            ))}
          </div>
        </div>
      </div>
      <button disabled={loading}>Save</button>
    </div>
  );
}
