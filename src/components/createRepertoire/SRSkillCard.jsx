import React from "react";
import "./SkillCard.css";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const SRSkillCard = (props) => {
  const { getImage } = useCardImageSwitch();
  let image = "";
  image = getImage(props.cardInfo.Name);

  return (
    <div
      className="repertoire-card"
      style={{
        backgroundImage: `url(${image})`,
      }}
      onClick={() =>
        props.returnToSkillCardPool(props.index, props.cardInfo.CardId)
      }
    >
      {!image && <div> {props.cardInfo.Name}</div>}
    </div>
  );
};

export default SRSkillCard;
