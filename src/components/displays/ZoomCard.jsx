import React from "react";
import "./DisplayedCard.css";
import "../hand/Skill.css";

import { useSelector, useDispatch } from "react-redux";
import { updateMagnifiedSkill } from "../../redux/magnifySkill";
import { updateDemoCount } from "../../redux/demoCount";

import { useGetImages } from "../../hooks/useGetImages";

const ZoomCard = (props) => {
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);
  const dispatch = useDispatch();

  const { getCardImage } = useGetImages();
  let image = getCardImage(props.cardInfo);

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 98:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  return (
    <>
      <div className="modal-backdrop">
        <div className="zoom-body">
          <img
            src={image}
            className={`zoom-card-image ${
              props.repertoire ? "zoom-card-image-small" : ""
            }`}
          />

          <div
            className="modal-backdrop2"
            onClick={() => {
              dispatch(updateMagnifiedSkill(null));
              handleUpdateDemoGuide();
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ZoomCard;
