import React from "react";
import "./AvelhemCard.css";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const CPSkillCard = (props) => {
  const { getImage } = useCardImageSwitch();
  let image = "";
  image = getImage(props.cardInfo.Name);

  return (
    <div
      className={
        props.cardInfo.Stock
          ? "full-skill-card"
          : "full-skill-card out-of-stock"
      }
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <button
        className="view-button"
        onClick={() => {
          props.selectViewCard(props.cardInfo);
        }}
      >
        View
      </button>

      <div
        className="skill-card"
        onClick={() => props.addToSkillRepertoire(props.cardInfo.CardId)}
      >
        <div className="remaining">{props.cardInfo.Name}</div>
        <div className="remaining">Remaining: {props.cardInfo.Stock}</div>
      </div>
    </div>
  );
};

export default CPSkillCard;
