import React, { useState } from "react";
import "./SkillCard.css";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

import { motion, useMotionValue } from "framer-motion";

const SRSkillCard = (props) => {
  const { getImage } = useCardImageSwitch();
  let image = "";
  image = getImage(props.cardInfo.Name);

  // console.log("key: " + props.key1)
  const [loading, setLoading] = useState(false)
  let testt = () => {
    props.returnToSkillCardPool(props.cardInfo)
  }

  if (loading) {
    testt = () => {console.log("Can't click this")}
  } else {
    testt = () => {props.returnToSkillCardPool(props.cardInfo)}
  }

  return (
    <motion.div
      layout={true}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, scale: 0.5}}
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
