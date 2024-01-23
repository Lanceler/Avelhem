import React from "react";
import "./AvelhemCard.css";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const ARAvelhemCard = (props) => {
  const { getImage } = useCardImageSwitch();
  let image = "";
  image = getImage(props.cardInfo.Name);

  return (
    <div
      className="avelhem-card"
      style={{
        backgroundImage: `url(${image})`,
      }}
      onClick={() =>
        props.returnToAvelhemCardPool(props.index, props.cardInfo.CardPoolIndex)
      }
    >
      {!image && <div> {props.cardInfo.Name}</div>}
    </div>
  );
};

export default ARAvelhemCard;
