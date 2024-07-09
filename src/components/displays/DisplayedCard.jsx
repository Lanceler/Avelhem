import React from "react";
import "./DisplayedCard.css";

import { useGetImages } from "../../hooks/useGetImages";

const DisplayedCard = (props) => {
  const { getCardImage } = useGetImages();
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
