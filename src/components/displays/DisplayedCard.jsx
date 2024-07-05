import React from "react";
import "./DisplayedCard.css";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const DisplayedCard = (props) => {
  const { getCardImage } = useCardImageSwitch();
  let image = getCardImage(props.cardInfo);

  return (
    <div
      className={`${props.inGame ? "inGame-card" : "display-card"}`}
      style={{
        backgroundImage: `url(${image})`,
      }}
    ></div>
  );
};

export default DisplayedCard;
