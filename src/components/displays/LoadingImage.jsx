import React, { useState, useEffect } from "react";
import "./LoadingImage.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";
import { useCardDatabase } from "../../hooks/useCardDatabase";

import { AnimatePresence, motion } from "framer-motion";

import LoadingBanner from "../../assets/others/LoadingBanner.png";

const LoadingImage = (props) => {
  return (
    <div className="loading-image-body">
      <div className="loading-image-container">
        <AnimatePresence>
          <motion.div
            transition={{ duration: 1.0, scale: 0.5 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="loading-image"
          >
            <img src={LoadingBanner}></img>
          </motion.div>
          <div className="loading-text">
            {`Loading... ${props.percentLoaded}%`}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoadingImage;
