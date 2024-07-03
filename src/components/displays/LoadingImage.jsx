import React, { useState, useEffect } from "react";
import "./LoadingImage.css";

import LoadingBanner from "../../assets/others/LoadingBanner.png";

const LoadingImage = (props) => {
  return (
    <div className="loading-image-body">
      <div
        className="loading-image-container"
        style={{
          backgroundImage: `url(${LoadingBanner})`,
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
