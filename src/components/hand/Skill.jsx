import React from "react";
import "./Skill.css";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

import { useCardDatabase } from "../../hooks/useCardDatabase";

const Skill = (props) => {
  const { getImage } = useCardImageSwitch();
  const { getSkillById } = useCardDatabase();

  const cardInfo = getSkillById(props.cardId);

  let image = "";
  image = getImage(cardInfo.Name);

  return (
    <div
      className="select-skill"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {!image && <div> {cardInfo.Name}</div>}
    </div>
  );
};

export default Skill;
