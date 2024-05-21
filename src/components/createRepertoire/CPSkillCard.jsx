import React, { useState } from "react";
import "./AvelhemCard.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

import ZoomCard from "../displays/ZoomCard";

const CPSkillCard = (props) => {
  const { getImage } = useCardImageSwitch();
  let image = "";
  image = getImage(props.cardInfo.Name);

  const [zoom, setZoom] = useState(false);

  const closeZoom = () => {
    setZoom(false);
  };

  const openZoom = () => {
    setZoom(true);
    console.log("Open Zoom");
  };

  return (
    <div>
      {zoom === true && (
        <ZoomCard cardInfo={props.cardInfo.CardId} closeZoom={closeZoom} />
      )}

      <div
        className={`repertoire-card ${
          props.cardInfo.Stock ? "" : "out-of-stock"
        }`}
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <button
          className="zoom-button"
          onClick={() => {
            openZoom();
          }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>

        <div
          className="skill-card"
          onClick={() => props.addToSkillRepertoire(props.index)}
        >
          {/* <div className="remaining">{props.cardInfo.Name}</div> */}
          <div className="remaining">Remaining: {props.cardInfo.Stock}</div>
        </div>
      </div>
    </div>
  );
};

export default CPSkillCard;
