import React, { useState, useEffect } from "react";
import "./LoadingImage.css";

import { useGetImages } from "../../hooks/useGetImages";

const LoadingImage = (props) => {
  const { getMiscImage } = useGetImages();

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
