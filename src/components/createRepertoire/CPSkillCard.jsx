import React from "react";
import "./SkillCard.css";
import background from "./IgnitionPropulsion.png";

const CPSkillCard = (props) => {
  return (
    <div
      className={
        props.cardInfo.Stock ? "skill-card" : "skill-card out-of-stock"
      }
      onClick={() => props.addToSkillRepertoire(props.cardInfo.CardId)}
      // style={{
      //   backgroundImage: `url(${require("./IgnitionPropulsion.png")})`,
      // }}
    >
      <div> {props.cardInfo.Name}</div>

      <div className="remaining">Remaining: {props.cardInfo.Stock}</div>
    </div>
  );
};

export default CPSkillCard;
