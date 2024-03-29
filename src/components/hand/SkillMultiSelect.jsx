import React from "react";
import "./Skill.css";

import { useSelector, useDispatch } from "react-redux";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";
import { useCardDatabase } from "../../hooks/useCardDatabase";

const SkillMultiSelect = (props) => {
  const { getImage } = useCardImageSwitch();
  const { getSkillById } = useCardDatabase();

  const cardInfo = getSkillById(props.usableSkill.id);

  let image = "";
  image = getImage(cardInfo.Name);

  const handleClick = () => {
    if (props.canAdd) {
      if (props.selectedSkills.includes(props.i)) {
        props.selectedSkills.splice(props.selectedSkills.indexOf(props.i), 1);
        props.setSelectedSkills([...props.selectedSkills]);
      } else if (props.selectedSkills.length < props.addLimit) {
        props.setSelectedSkills([...props.selectedSkills, props.i]);
      }
    }
  };

  return (
    <div
      className={`select-skill ${!props.canAdd ? "cannotUseSkill" : ""}`}
      style={{
        backgroundImage: `url(${image})`,
      }}
      onClick={() => handleClick()}
    >
      {props.selectedSkills.includes(props.i) && (
        <div className="multiSelectCard">
          <div className="multiSelectIndex">
            {props.selectedSkills.indexOf(props.i) + 1}
          </div>
        </div>
      )}

      {!image && <div> {cardInfo.Name}</div>}
    </div>
  );
};

export default SkillMultiSelect;
