import React, { useState } from "react";
import "./AvelhemCard.css";

import { useSelector, useDispatch } from "react-redux";
import { updateMagnifiedSkill } from "../../redux/magnifySkill";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useGetImages } from "../../hooks/useGetImages";

const CPAvelhemCard = (props) => {
  const dispatch = useDispatch();

  const { getCardImage } = useGetImages();
  const image = getCardImage(props.cardInfo.CardId);

  const element = props.cardInfo.Name.replace(" Avelhem", "");

  return (
    <div>
      <div
        className={`repertoire-card ${
          props.cardInfo.Stock ? "" : "out-of-stock"
        }`}
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <button
          className="zoom-button"
          onClick={() => {
            dispatch(updateMagnifiedSkill(props.cardInfo.CardId));
          }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>

        <div
          className="skill-card"
          onClick={() => props.addToAvelhemRepertoire(props.index)}
        >
          <div className="avelhem-card-remaining ">{element}</div>
          <div className="avelhem-card-remaining ">
            Remaining: {props.cardInfo.Stock}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CPAvelhemCard;
