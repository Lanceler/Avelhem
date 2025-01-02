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
          case 10:
            return "SX-01";

          case 17:
            return 8;

          case 71:
            return 7;

          case 78:
            return "FromTheAshes";

          case 100:
            return "01-01";

          case 101:
            return "SA-04";
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
            style={{ left: 50, transform: "translate(40%, -50%)" }}
          />
        </div>
      </div>
    </>
  );
};

export default DemoImage;
