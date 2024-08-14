import React, { useState, useEffect } from "react";
import "./DisplayedCard.css";

import { useSelector, useDispatch } from "react-redux";
import { updateMagnifiedSkill } from "../../redux/magnifySkill";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useGetImages } from "../../hooks/useGetImages";
import { useCardDatabase } from "../../hooks/useCardDatabase";

import { AnimatePresence, motion } from "framer-motion";

const ActivatedSkills = () => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();
  const { getCardImage } = useGetImages();

  return (
    <>
      <div className="skillChain">
        <AnimatePresence>
          {localGameState.activatingSkill.map((card, i) => (
            <motion.div
              // layout={true}
              // initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: (localGameState.activatingSkill.length - (i + 1)) * -10,
              }}
              transition={{ duration: 0.4, scale: 0.5 }}
              exit={{ opacity: 0, scale: 1.5 }}
              key={card + i}
              className={`activatedSkill displayedSkills ${
                localGameState.activatingSkill.length - 1 === i
                  ? "topmostDisplay"
                  : ""
              }`}
              style={{
                filter: `${
                  localGameState.activatingSkill.length - 1 === i
                    ? ""
                    : "grayscale(65%)"
                }`,
                left: 5 + i * 10,
                transform: `rotate(${
                  (localGameState.activatingSkill.length - (i + 1)) * -10
                }deg)`,
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
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{ duration: 0.4, scale: 0.5 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="activatedSkill displayedSkills topmostDisplay"
              style={{
                left: 5,
                filter: `${
                  localGameState.activatingSkill.length === 1
                    ? ""
                    : "grayscale(65%)"
                }`,

                backgroundImage: `url(${getCardImage(
                  localGameState.activatingResonator[0]
                )})`,
              }}
            ></motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ActivatedSkills;
