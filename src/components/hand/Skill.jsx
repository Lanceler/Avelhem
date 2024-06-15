import React, { useState } from "react";
import "./Skill.css";

import { useSelector, useDispatch } from "react-redux";
import { updateMagnifiedSkill } from "../../redux/magnifySkill";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const Skill = (props) => {
  const { magnifiedSkill } = useSelector((state) => state.magnifiedSkill);
  const dispatch = useDispatch();

  const { getImage2 } = useCardImageSwitch();

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
    <>
      <div
        className={`select-skill ${
          !props.canActivateSkill ? "cannotUseSkill" : ""
        }`}
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <button
          className="zoom-button"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(updateMagnifiedSkill(props.usableSkill.id));
          }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        <div
          className="select-skill-click"

          // onClick={() => handleClick()}
        ></div>
      </div>
    </>
  );
};

export default Skill;
