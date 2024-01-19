import React from "react";
import "./SkillCard.css";

const SRSkillCard = (props) => {
  return (
    <div
      className="skill-card"
      onClick={() => props.returnToCardPool(props.index, props.cardInfo.CardId)}
    >
      <div> {props.cardInfo.Name}</div>
    </div>
  );
};

export default SRSkillCard;
