import "./SkillCard.css";
import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { useGetImages } from "../../hooks/useGetImages";

import { updateMagnifiedSkill } from "../../redux/magnifySkill";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { motion, useMotionValue } from "framer-motion";

const SRSkillCard = (props) => {
  const dispatch = useDispatch();
  const { getCardImage } = useGetImages();
  const image = getCardImage(props.cardInfo.CardId);

  // console.log("key: " + props.key1)
  const [isLoading, setIsLoading] = useState(false);

  const allowFunction = () => {
    if (!isLoading) {
      setIsLoading(true);
      props.returnToSkillCardPool(props.cardInfo, props.index);
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
      onClick={() => allowFunction()}
    >
      {!image && <div> {props.cardInfo.Name}</div>}

      <button
        className="zoom-button"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(updateMagnifiedSkill(props.cardInfo.CardId));
        }}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </motion.div>
  );
};

export default SRSkillCard;
