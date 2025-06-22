import React from "react";
import "./DisplayedCard.css";
import "../hand/Skill.css";

import { useSelector, useDispatch } from "react-redux";
import { useGetImages } from "../../hooks/useGetImages";

const DemoImage = (props) => {
  const { getCardImage } = useGetImages();
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);

  const getImage = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 16:
            return 1;
          case 95:
          case 96:
            return "06-01";
          case 97:
            return "05-01";
          case 98:
            return "SA-04";
          // case 78:
          //   return "FromTheAshes";
        }
    }
  };

  const image = getCardImage(getImage());

  return (
    <>
      <div className="modal-backdrop">
        <div className="zoom-body">
          <img
            src={image}
            className={`zoom-card-image ${
              props.repertoire ? "zoom-card-image-small" : ""
            }`}
            style={{ left: 50, transform: "translate(25%, -50%)" }}
          />
        </div>
      </div>
    </>
  );
};

export default DemoImage;
