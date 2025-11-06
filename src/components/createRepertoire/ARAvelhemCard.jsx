import "./AvelhemCard.css";

import { useDispatch } from "react-redux";
import { updateMagnifiedSkill } from "../../redux/magnifySkill";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { motion } from "framer-motion";

import { useGetImages } from "../../hooks/useGetImages";

const ARAvelhemCard = (props) => {
  const dispatch = useDispatch();
  const { getCardImage } = useGetImages();
  const image = getCardImage(props.cardInfo.CardId);

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!isClicked) {
      setIsClicked(true);
      props.returnToAvelhemCardPool(props.index, props.cardInfo.CardPoolIndex);
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

export default ARAvelhemCard;
