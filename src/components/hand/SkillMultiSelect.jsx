import React, { useState } from "react";
import "./Skill.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import ZoomCard from "../displays/ZoomCard";

import { useSelector, useDispatch } from "react-redux";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const SkillMultiSelect = (props) => {
  const { getImage2 } = useCardImageSwitch();

  const [zoom, setZoom] = useState(false);

  const closeZoom = () => {
    setZoom(false);
  };

  const openZoom = () => {
    setZoom(true);
    console.log("Open Zoom");
  };

  const image = getImage2(props.usableSkill);

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
    <>
      {zoom === true && (
        <ZoomCard cardInfo={props.usableSkill} closeZoom={closeZoom} />
      )}

      <div
        className={`select-skill ${!props.canAdd ? "cannotUseSkill" : ""}`}
        style={{
          backgroundImage: `url(${image})`,
        }}
        // onClick={() => handleClick()}
      >
        <button
          className="zoom-button"
          onClick={() => {
            openZoom();
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

        <div className="select-skill-click" onClick={() => handleClick()}></div>
      </div>
    </>
  );
};

export default SkillMultiSelect;
