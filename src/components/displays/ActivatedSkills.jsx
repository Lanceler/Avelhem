import React, { useState, useEffect } from "react";
import "./DisplayedCard.css";

import { useSelector, useDispatch } from "react-redux";
import { updateMagnifiedSkill } from "../../redux/magnifySkill";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useGetImages } from "../../hooks/useGetImages";

import { AnimatePresence, motion } from "framer-motion";

const ActivatedSkills = () => {
  const { localGameState } = useSelector((state) => state.gameState);
  const dispatch = useDispatch();
  const { getCardImage } = useGetImages();

  return (
    <>
      <div className="skillChain">
        <AnimatePresence>
          {localGameState.activatingSkill.map((card, i) => (
            <motion.div
              key={i + card + i}
              initial={{
                opacity: 0.35,
                scale: 1.2,
                filter: "brightness(300%)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: (localGameState.activatingSkill.length - (i + 1)) * -10,
                filter:
                  localGameState.activatingSkill.length - 1 === i
                    ? "brightness(100%)"
                    : "grayscale(65%) brightness(100%)",
              }}
              transition={{
                duration: 0.65,
                ease: "easeOut",
              }}
              exit={{
                opacity: 0,
                scale: 1.25,
                y: -350,
                transition: { duration: 0.75, ease: "easeOut" },
              }}
              className={`activatedSkill displayedSkills ${
                localGameState.activatingSkill.length - 1 === i
                  ? "topmostDisplay"
                  : ""
              }`}
              style={{
                left: 5 + i * 10,
                backgroundImage: `url(${getCardImage(card)})`,
              }}
            >
              <button
                className="zoom-button"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(updateMagnifiedSkill(card));
                }}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="resonatorChain">
        <AnimatePresence>
          {localGameState.activatingResonator.length > 0 && (
            <motion.div
              initial={{
                opacity: 0.35,
                scale: 1.2,
                filter: "brightness(300%)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter:
                  localGameState.activatingSkill.length === 1
                    ? "brightness(100%)"
                    : "grayscale(65%) brightness(100%)",
              }}
              transition={{
                duration: 0.65,
                ease: "easeOut",
              }}
              exit={{
                opacity: 0,
                scale: 1.25,
                y: -350,
                transition: { duration: 0.75, ease: "easeOut" },
              }}
              className="activatedSkill displayedSkills topmostDisplay"
              style={{
                left: 5,
                backgroundImage: `url(${getCardImage(
                  localGameState.activatingResonator[0]
                )})`,
              }}
            >
              <button
                className="zoom-button"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(
                    updateMagnifiedSkill(localGameState.activatingResonator[0])
                  );
                }}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ActivatedSkills;
