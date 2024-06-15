import React, { useState } from "react";
import "./Skill.css";

import { useSelector, useDispatch } from "react-redux";
import { updateMagnifiedSkill } from "../../redux/magnifySkill";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const SkillMultiSelect = (props) => {
  const { magnifiedSkill } = useSelector((state) => state.magnifiedSkill);
  const dispatch = useDispatch();

  const { getImage2 } = useCardImageSwitch();

  const image = getImage2(props.usableSkill);

  // const handleClick = () => {
  //   if (props.canAdd) {
  //     if (props.selectedSkills.includes(props.i)) {
  //       props.selectedSkills.splice(props.selectedSkills.indexOf(props.i), 1);
  //       props.setSelectedSkills([...props.selectedSkills]);
  //     } else if (props.selectedSkills.length < props.addLimit) {
  //       props.setSelectedSkills([...props.selectedSkills, props.i]);
  //     }
  //   }
  // };

  return (
    <>
      <div
        className={`select-skill ${!props.canAdd ? "cannotUseSkill" : ""}`}
        style={{
          backgroundImage: `url(${image})`,
        }}
        // onClick={() => handleClick()}
      >
        <button
          className="zoom-button"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(updateMagnifiedSkill(props.usableSkill));
          }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>

        {props.selectedSkills.includes(props.i) && (
          <div className="multiSelectCard">
            <div className="multiSelectIndex">
              {props.selectedSkills.indexOf(props.i) + 1}
            </div>
          </div>
        )}

        <div
          className="select-skill-click"

          // onClick={() => handleClick()}
        ></div>
      </div>
    </>
  );
};

export default SkillMultiSelect;
