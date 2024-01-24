import React from "react";
import "./AvelhemCard.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const CPSkillCard = (props) => {
  const { getImage } = useCardImageSwitch();
  let image = "";
  image = getImage(props.cardInfo.Name);

  return (
    <div
      className={
        props.cardInfo.Stock
          ? "full-skill-card"
          : "full-skill-card out-of-stock"
      }
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <button
        className="view-button"
        onClick={() => {
          props.selectViewCard(props.cardInfo);
        }}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass}/>

      </button>

      <div
        className="skill-card"
        onClick={() => props.addToSkillRepertoire(props.index)}
      >
        <div className="remaining">{props.cardInfo.Name}</div>
        <div className="remaining">Remaining: {props.cardInfo.Stock}</div>
      </div>
    </div>
  );
};

export default CPSkillCard;
