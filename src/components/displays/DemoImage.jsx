import React from "react";
import "./DisplayedCard.css";
import "../hand/Skill.css";

import { useSelector, useDispatch } from "react-redux";
import { useGetImages } from "../../hooks/useGetImages";

const DemoImage = (props) => {
  const { getCardImage } = useGetImages();
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const getImage = () => {
    switch (demoGuide) {
      case "Learn1.8.1":
      case "Learn1.8.2":
        return 1;

      case "Learn1.65":
      case "Learn1.65.1":
        return "05-01";

      case "Learn1.65.2":
        return "SA-04";

      case "Learn1.66":
        return "04-01";

      case "Learn1.104":
      case "Learn1.105":
        return "SB-02";

      case "Learn1.113":
        return "07-02";

      case "Learn1.137":
      case "Learn1.138":
        return "04-03";

      case "Learn1.201":
        return "AmbianceAssimilation";

      case "Learn1.205":
        return "SA-02";
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
          />
        </div>
      </div>
    </>
  );
};

export default DemoImage;
