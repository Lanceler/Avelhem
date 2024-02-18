import React from "react";
import "./Skill.css";

import { useSelector, useDispatch } from "react-redux";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";
import { useCardDatabase } from "../../hooks/useCardDatabase";

const Skill = (props) => {
  const { getImage } = useCardImageSwitch();
  const { getSkillById } = useCardDatabase();

  const cardInfo = getSkillById(props.usableSkill.id);

  let image = "";
  image = getImage(cardInfo.Name);

  const handleClick = () => {
    if (props.canActivateSkill) {
      props.setSelectedSkill(props.i);
    }
  };

  return (
    <div
      className={`select-skill ${
        !props.canActivateSkill ? "cannotUseSkill" : ""
      }`}
      style={{
        backgroundImage: `url(${image})`,
      }}
      onClick={() => handleClick()}
    >
      {!image && <div> {cardInfo.Name}</div>}
    </div>
  );
};

export default Skill;
