import React from "react";
import "./AvelhemCard.css";

import {motion} from "framer-motion"

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const CPAvelhemCard = (props) => {
  const { getImage } = useCardImageSwitch();
  let image = "";
  image = getImage(props.cardInfo.Name);

  return (
    <motion.div
      className={
        props.cardInfo.Stock ? "avelhem-card" : "avelhem-card out-of-stock"
      }
      onClick={() => props.addToAvelhemRepertoire(props.index)}
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="remaining">{props.cardInfo.Name}</div>
      <div className="remaining">Remaining: {props.cardInfo.Stock}</div>
    </motion.div>
  );
};

export default CPAvelhemCard;
