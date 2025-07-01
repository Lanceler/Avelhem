import React, { useState, useEffect } from "react";
import "./LoadingImage.css";

import { Blurhash } from "react-blurhash";

import { useGetImages } from "../../hooks/useGetImages";

const LoadingImage = (props) => {
  const { getMiscImage } = useGetImages();

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();

    img.src = getMiscImage("LoadingBanner");
    img.onload = () => {
      setImageLoaded(true);
    };
    img.onerror = () => {
      setImageLoaded(true);
    };
  }, [getMiscImage]);

  return (
    <div className="loading-image-body">
      <div
        className="loading-image-container"
        style={{
          backgroundImage: `url(${getMiscImage("LoadingBanner")})`,
        }}
      >
        {!imageLoaded && (
          <Blurhash
            hash="LcO.+wt7mk-,_JbvEMNaDkSg$*M|"
            width="100%"
            height="100%"
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        )}

        <div className="loading-message">
          <div className="loading-text">
            {`Preloading... ${props.percentLoaded}%  `}
          </div>
          <div>
            <button
              className="loading-button"
              onClick={() => {
                props.setShowContent(true);
              }}
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingImage;
