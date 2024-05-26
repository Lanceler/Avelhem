import React, { useState } from "react";
import "./Skill.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

import ZoomCard from "../displays/ZoomCard";

import { useSelector, useDispatch } from "react-redux";

const Skill = (props) => {
  const { getImage2 } = useCardImageSwitch();

  const [zoom, setZoom] = useState(false);

  const closeZoom = () => {
    setZoom(false);
  };

  const openZoom = () => {
    setZoom(true);
    console.log("Open Zoom");
  };

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
      {zoom === true && (
        <ZoomCard cardInfo={props.usableSkill.id} closeZoom={closeZoom} />
      )}

      <div
        className={`select-skill ${
          !props.canActivateSkill ? "cannotUseSkill" : ""
        }`}
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
        <div className="select-skill-click" onClick={() => handleClick()}></div>
      </div>
    </>
  );
};

export default Skill;
