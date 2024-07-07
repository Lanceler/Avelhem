import React, { useState, useEffect } from "react";
import "./LoadingImage.css";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const LoadingImage = (props) => {
  const { getMiscImage } = useCardImageSwitch();

  return (
    <div className="loading-image-body">
      <div
        className="loading-image-container"
        style={{
          backgroundImage: `url(${getMiscImage("LoadingBanner")})`,
        }}
      >
        <div className="loading-text">
          {`Loading... ${props.percentLoaded}%  `}
        </div>
      </div>
    </div>
  );
};

export default LoadingImage;
