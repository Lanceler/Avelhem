import React from "react";
import "./SkillCard.css";
import ignitionPropulsionBG from "../../assets/skillcards/IgnitionPropulsion.png";

let image = "";


const SRSkillCard = (props) => {
  switch (props.cardInfo.Name) {
    case "Ignition Propulsion":
      image = ignitionPropulsionBG
      break;
    default:
      image = ""
      break;
  }


  return (
    <div
      className="skill-card"
      style={{
        backgroundImage: `url(${(image)})`,
      }}
      onClick={() => props.returnToCardPool(props.index, props.cardInfo.CardId)}
    >
      <div> {props.cardInfo.Name}</div>
    </div>
  );
};

export default SRSkillCard;
