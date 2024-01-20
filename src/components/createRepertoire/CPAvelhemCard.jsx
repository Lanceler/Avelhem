import React from "react";
import "./SkillCard.css";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const CPAvelhemCard = (props) => {
  const { getImage } = useCardImageSwitch();
  let image = "";
  image = getImage(props.cardInfo.Name);

  return (
    <div
      className={
        props.cardInfo.Stock ? "skill-card" : "skill-card out-of-stock"
      }
      onClick={() => props.addToAvelhemRepertoire(props.cardInfo.CardId)}
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="remaining">{props.cardInfo.Name}</div>
      <div className="remaining">Remaining: {props.cardInfo.Stock}</div>
    </div>
  );
};

export default CPAvelhemCard;
