import React from "react";
import "./SkillCard.css";
import ignitionPropulsionBG from "../../assets/skillcards/IgnitionPropulsion.png";

let image = "";
  const CPSkillCard = (props) => {
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
      className={
        props.cardInfo.Stock ? "skill-card" : "skill-card out-of-stock"
      }
      onClick={() => props.addToSkillRepertoire(props.cardInfo.CardId)}
      style={{
        backgroundImage: `url(${(image)})`,
      }}
    >
      <div> {props.cardInfo.Name}</div>

      <div className="remaining">Remaining: {props.cardInfo.Stock}</div>
    </div>
  );
};

export default CPSkillCard;
