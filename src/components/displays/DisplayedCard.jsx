import React from "react";
import "./DisplayedCard.css";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const DisplayedCard = (props) => {
  const { getImage } = useCardImageSwitch();
  let image = "";
  image = getImage(props.cardInfo.Name);

  return (
    <div
      className="display-card"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {!image && <div> {props.cardInfo.Name}</div>}
    </div>
  );
};

export default DisplayedCard;
