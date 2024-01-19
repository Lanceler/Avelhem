import React from "react";
import { useState, useEffect } from "react";
import "./CreateRepertoire.css";

import CPSkillCard from "../components/createRepertoire/CPSkillCard";
import SRSkillCard from "../components/createRepertoire/SRSkillCard";
import { useCardDatabase } from "../hooks/useCardDatabase";

export default function CreateRepertoire() {
  const { skillCardList } = useCardDatabase();
  const [cardPool, setCardPool] = useState(skillCardList);
  const [skillRepertoire, setSkillRepertoire] = useState([]);

  const addToSkillRepertoire = (skillCardId) => {
    if (skillRepertoire.length < 60 && cardPool[skillCardId - 1].Stock > 0) {
      let newSkillRepertoire = [...skillRepertoire];
      newSkillRepertoire.push(skillCardList[skillCardId - 1]);

      newSkillRepertoire.sort((a, b) => a.CardId - b.CardId);
      setSkillRepertoire(newSkillRepertoire);

      let newCardPool = [...cardPool];
      newCardPool = [...newCardPool, newCardPool[skillCardId - 1].Stock--];
    }
  };

  const returnToCardPool = (skillCardIndex, skillCardId) => {
    let newSkillRepertoire = [...skillRepertoire];
    newSkillRepertoire.splice(skillCardIndex, 1);
    setSkillRepertoire(newSkillRepertoire);
    let newCardPool = [...cardPool];
    newCardPool = [...newCardPool, newCardPool[skillCardId - 1].Stock++];
  };

  return (
    <div>
      CreateRepertoire
      <div className="main-division">
        <div className="division">
          Skill Repertoire: {skillRepertoire.length} / 60
          <div className="sub-division">
            {skillRepertoire.map((card, index) => (
              <SRSkillCard
                key={index}
                index={index}
                cardInfo={card}
                returnToCardPool={returnToCardPool}
              />
            ))}
          </div>
        </div>

        <div className="division">
          Card Pool
          <div className="sub-division">
            {cardPool.map((card, index) => (
              <CPSkillCard
                key={index}
                cardInfo={card}
                addToSkillRepertoire={addToSkillRepertoire}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
