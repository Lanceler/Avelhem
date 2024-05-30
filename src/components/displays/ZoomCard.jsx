import React from "react";
import "./DisplayedCard.css";
import "../hand/Skill.css";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const ZoomCard = (props) => {
  const { getImage2 } = useCardImageSwitch();
  let image = getImage2(props.cardInfo);

  return (
    <>
      <div className="modal-backdrop">
        <div className="zoom-body">
          <img src={image} className="zoom-card-image" />

          <div
            className="modal-backdrop"
            onClick={() => props.closeZoom()}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ZoomCard;
