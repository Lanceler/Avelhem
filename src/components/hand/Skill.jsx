import React from "react";
import "./Skill.css";

import { useSelector, useDispatch } from "react-redux";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";
import { useCardDatabase } from "../../hooks/useCardDatabase";

const Skill = (props) => {
  const { getImage2 } = useCardImageSwitch();
  // const { getSkillById } = useCardDatabase();

  // const cardInfo = getSkillById(props.usableSkill.id);

  const image = getImage2(props.usableSkill.id);

  const handleClick = () => {
    if (props.canActivateSkill) {
      if (props.selectedSkill === props.i) {
        props.setSelectedSkill(null);
      } else {
        props.setSelectedSkill(props.i);
      }
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
      {/* {!image && <div> {cardInfo.Name}</div>} */}
    </div>
  );
};

export default Skill;
