import React, { useState, useEffect } from "react";
import "./Skill.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";
import { useCardDatabase } from "../../hooks/useCardDatabase";

import Collapse from "../../assets/others/Collapse.png";

import SelectedAvelhem from "./SelectedAvelhem";

const PlayerAvelhemHand = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { getImage } = useCardImageSwitch();
  const { getAvelhemById } = useCardDatabase();

  const [raise, setRaise] = useState(false);
  const [raiseHeight, setRaiseHeight] = useState(0);
  const [selectedAvelhem, setSelectedAvelhem] = useState(null);

  useEffect(() => {
    setRaiseHeight(
      -45 + Math.ceil(localGameState[self].avelhemHand.length / 2) * 86
    );
    setRaise(false);
    setSelectedAvelhem(null);
  }, [localGameState[self].avelhemHand.length]);

  const handleCollapse = () => {
    setRaise(false);
  };

  const handleRaise = () => {
    if (!raise && localGameState[self].avelhemHand.length) {
      setRaise(true);
    }
  };

  const handleCard = (card, index) => {
    if (raise) {
      setSelectedAvelhem({ avelhem: card, handIndex: index });
      //setRaise(false);
    }
  };

  return (
    <div className="mainSkillHand">
      {selectedAvelhem && (
        <SelectedAvelhem
          selectedAvelhem={selectedAvelhem}
          setSelectedAvelhem={setSelectedAvelhem}
          updateFirebase={props.updateFirebase}
          setRaise={setRaise}
        />
      )}
      {raise === true && (
        <button
          className="collapse"
          onClick={() => handleCollapse()}
          style={{
            top: `${-raiseHeight + 45}px`,
          }}
        >
          <img src={Collapse} className="collapseIcon" />
        </button>
      )}
      {localGameState[self] && (
        <div
          className="player-avelhemhand-container"
          style={{
            // top: `${raise ? -raiseHeight : 55}px`,
            transform: `translateY(${raise ? -raiseHeight : 55}px)`,
          }}
          onClick={(e) => handleRaise(e)}
        >
          {localGameState[self].avelhemHand.map((card, index) => (
            <div
              onClick={() => handleCard(card, index)}
              key={index}
              className={`player-hand-card indivAvelhem ${
                raise ? "enlargable" : ""
              }`}
              style={{
                backgroundImage: `url(${getImage(getAvelhemById(card).Name)})`,
                top: Math.floor(index / 2) * -110,
                left: (index % 2) * -60,
                // left: (index % 5) * -30,
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerAvelhemHand;

// import React, { useState } from "react";
// import "./Skill.css";

// import { useSelector, useDispatch } from "react-redux";
// import { updateState } from "../../redux/gameState";
// import { useRecurringEffects } from "../../hooks/useRecurringEffects";

// import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";
// import { useCardDatabase } from "../../hooks/useCardDatabase";

// const PlayerAvelhemHand = () => {
//   const { localGameState } = useSelector((state) => state.gameState);
//   const { self } = useSelector((state) => state.teams);
//   const { getImage } = useCardImageSwitch();
//   const { getAvelhemById } = useCardDatabase();

//   const [raise, setRaise] = useState(false);

//   const handleRaise = () => {
//     setRaise(!raise);
//   };

//   return (
//     <div className="">
//       {localGameState[self] && (
//         <div
//           className="player-avelhemHand-container"
//           style={{
//             top: -40,
//             height:
//               170 +
//               Math.floor((localGameState[self].avelhemHand.length - 5) / 5) *
//                 30,
//           }}
//         >
//           {localGameState[self].avelhemHand.map((card, index) => (
//             <div
//               key={index}
//               className="player-hand-card"
//               style={{
//                 backgroundImage: `url(${getImage(getAvelhemById(card).Name)})`,
//                 top: Math.floor(index / 5) * -110,
//                 left: Math.floor(index / 5) * 11 + (index % 5) * -50,
//                 // left: (index % 5) * -30,
//               }}
//             ></div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PlayerAvelhemHand;
