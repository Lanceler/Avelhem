import React, { useState } from "react";
import "./Skill.css";

import { useSelector, useDispatch } from "react-redux";
import { updateMagnifiedSkill } from "../../redux/magnifySkill";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useGetImages } from "../../hooks/useGetImages";

const Skill = (props) => {
  const { magnifiedSkill } = useSelector((state) => state.magnifiedSkill);
  const dispatch = useDispatch();

  const { getCardImage } = useGetImages();

  return (
    <>
      <div
        className={`select-skill ${
          !props.canActivateSkill ? "cannotUseSkill" : ""
        }`}
        style={{
          backgroundImage: `url(${getCardImage(props.usableSkill.id)})`,
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
        <div className="select-skill-click"></div>
      </div>
    </>
  );
};

export default Skill;
