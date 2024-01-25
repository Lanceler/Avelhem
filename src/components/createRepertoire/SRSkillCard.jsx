import React from "react";
import "./SkillCard.css";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

import { motion } from "framer-motion";

const SRSkillCard = (props) => {
  const { getImage } = useCardImageSwitch();
  let image = "";
  image = getImage(props.cardInfo.Name);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 3.2, scale: 0.5 }}
      exit={{ opacity: 0 }}
      className="repertoire-card"
      style={{
        backgroundImage: `url(${image})`,
      }}
      onClick={() =>
        // props.returnToSkillCardPool(props.index, props.cardInfo.CardPoolIndex)
        props.returnToSkillCardPool(props.cardInfo)
      }
    >
      {!image && <div> {props.cardInfo.Name}</div>}
    </motion.div>
  );
};

export default SRSkillCard;
