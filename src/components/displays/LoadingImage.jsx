import React, { useState, useEffect } from "react";
import "./LoadingImage.css";

import { AnimatePresence, motion } from "framer-motion";

import LoadingBanner from "../../assets/others/LoadingBanner.png";

const LoadingImage = (props) => {
  return (
    <div className="loading-image-body">
      <div className="loading-image-container">
        <AnimatePresence>
          <motion.div
            transition={{ duration: 1.5, scale: 0.5 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="loading-image"
            key={1}
          >
            <img src={LoadingBanner}></img>
          </motion.div>
          <div className="loading-text" key={2}>
            {`Loading... ${props.percentLoaded}%`}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoadingImage;
