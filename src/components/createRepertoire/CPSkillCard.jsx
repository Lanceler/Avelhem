import React from "react";
import "./SkillCard.css";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const CPSkillCard = (props) => {
  const { getImage } = useCardImageSwitch();
  let image = "";
  image = getImage(props.cardInfo.Name);

  return (
    <div
      className={
        props.cardInfo.Stock ? "skill-card" : "skill-card out-of-stock"
      }
      onClick={() => props.addToSkillRepertoire(props.cardInfo.CardId)}
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {!image && <div> {props.cardInfo.Name}</div>}
      <div className="remaining">{props.cardInfo.Name}</div>
      <div className="remaining">Remaining: {props.cardInfo.Stock}</div>
    </div>
  );
};

export default CPSkillCard;
