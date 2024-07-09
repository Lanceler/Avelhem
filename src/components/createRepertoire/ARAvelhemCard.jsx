import React, { useState, useEffect } from "react";
import "./AvelhemCard.css";

import { useGetImages } from "../../hooks/useGetImages";

import { motion, useMotionValue, useScroll } from "framer-motion";

const ARAvelhemCard = (props) => {
  const { getCardImage } = useGetImages();
  const image = getCardImage(props.cardInfo.CardId);

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!isClicked) {
      setIsClicked(true);
      props.returnToAvelhemCardPool(props.index, props.cardInfo.CardPoolIndex);
    } else {
      console.log(isClicked);
    }
  };

  return (
    <motion.div
      layout={true}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, scale: 0.5 }}
      exit={{ opacity: 0 }}
      className="repertoire-card"
      style={{
        backgroundImage: `url(${image})`,
      }}
      onClick={() => handleClick()}
    >
      {!image && <div> {props.cardInfo.Name}</div>}
    </motion.div>
  );
};

export default ARAvelhemCard;
