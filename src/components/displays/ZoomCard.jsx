import React from "react";
import "./DisplayedCard.css";
import "../hand/Skill.css";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const ZoomCard = (props) => {
  const { getImage2 } = useCardImageSwitch();
  let image = getImage2(props.cardInfo);

  return (
    <div className="modal-backdrop">
      <div className="modal-backdrop">
        <div className="zoom-body">
          <div
            className="zoom-card"
            style={{
              backgroundImage: `url(${image})`,
            }}
          >
            <button
              className="collapseSelected zoom-close"
              onClick={() => props.closeZoom()}
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoomCard;
