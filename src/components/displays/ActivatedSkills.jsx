import React, { useState, useEffect } from "react";
import "./DisplayedCard.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";
import { useCardDatabase } from "../../hooks/useCardDatabase";

import DisplayedCard from "./DisplayedCard";

const ActivatedSkills = () => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { getImage2 } = useCardImageSwitch();
  const { getSkillById } = useCardDatabase();

  return (
    <>
      <div className="activatedCardDisplay">
        <div className="skillChain">
          {localGameState.activatingSkill.map((card, i) => (
            <div
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
                backgroundImage: `url(${getImage2(
                  card
                  // localGameState.activatingSkill[i]
                )})`,
              }}
            ></div>
          ))}
        </div>

        <br />

        <div className="resonatorChain">
          {localGameState.activatingResonator.length > 0 && (
            <div
              className="activatedSkill displayedSkills"
              style={{
                left: 5,
                filter: `${
                  localGameState.activatingSkill.length === 1
                    ? ""
                    : "grayscale(65%)"
                }`,

                backgroundImage: `url(${getImage2(
                  localGameState.activatingResonator[0]
                )})`,
              }}
            ></div>
          )}
        </div>
      </div>
    </>
  );
};

export default ActivatedSkills;

// {
//   localGameState.activatingSkill.length > 0 && (
//     <>
//       <div className="activated-card">
//         <DisplayedCard
//           cardInfo={
//             localGameState.activatingSkill[
//               localGameState.activatingSkill.length - 1
//             ]
//           }
//           inGame={true}
//         />
//       </div>

//       {localGameState.activatingSkill.length === 1 &&
//         localGameState.activatingResonator.length === 1 && (
//           <DisplayedCard
//             cardInfo={localGameState.activatingResonator[0]}
//             inGame={true}
//           />
//         )}
//     </>
//   );
// }

{
  /* //   <DisplayedCard
        //     cardInfo={
        //       localGameState.activatingSkill[
        //         localGameState.activatingSkill.length - 1
        //       ]
        //     }
        //     inGame={true}
        //   /> */
}
