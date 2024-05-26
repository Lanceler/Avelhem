import React from "react";
import "./DisplayedCard.css";
import "../hand/Skill.css";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const ZoomCard = (props) => {
  const { getImage2 } = useCardImageSwitch();
  let image = getImage2(props.cardInfo);

  return (
    // <div className="modal-backdrop">
    //   <div className="modal-backdrop" onClick={() => props.closeZoom()}>
    //     <div className="zoom-body">
    //       <div
    //         className="zoom-card"
    //         style={{
    //           backgroundImage: `url(${image})`,
    //         }}
    //       >
    //         <button
    //           className="collapseSelected zoom-close"
    //           onClick={() => props.closeZoom()}
    //         >
    //           X
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>\
    <>
      <div className="modal-backdrop">
        <div className="zoom-body">
          <img src={image} className="zoom-card-image" />
          {/* <div
            className="zoom-card"
            style={{
              backgroundImage: `url(${image})`,
            }}
          > */}
          {/* <button
              className="collapseSelected zoom-close"
              onClick={() => props.closeZoom()}
            >
              X
            </button> */}
          {/* </div> */}

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
