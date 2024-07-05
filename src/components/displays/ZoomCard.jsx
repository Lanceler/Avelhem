import React from "react";
import "./DisplayedCard.css";
import "../hand/Skill.css";

import { useSelector, useDispatch } from "react-redux";
import { updateMagnifiedSkill } from "../../redux/magnifySkill";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const ZoomCard = (props) => {
  const { magnifiedSkill } = useSelector((state) => state.magnifiedSkill);
  const dispatch = useDispatch();

  const { getCardImage } = useCardImageSwitch();
  let image = getCardImage(props.cardInfo);

  return (
    <>
      <div className="modal-backdrop">
        <div className="zoom-body">
          <img src={image} className="zoom-card-image" />

          <div
            className="modal-backdrop2"
            onClick={() => dispatch(updateMagnifiedSkill(null))}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ZoomCard;
