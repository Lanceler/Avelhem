import React from "react";
import "./Skill.css";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";
import { useCardDatabase } from "../../hooks/useCardDatabase";

const SelectedAvelhem = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { getImage } = useCardImageSwitch();
  const { getAvelhemById } = useCardDatabase();

  const { isMuted } = useRecurringEffects();

  const handleCollapse = () => {
    props.setSelectedAvelhem(null);
  };

  let scionClass = "";
  switch (props.selectedAvelhem.avelhem) {
    case 1:
      scionClass = "Fire Scion";
      break;
    case 2:
      scionClass = "Water Scion";
      break;
    case 3:
      scionClass = "Wind Scion";
      break;
    case 4:
      scionClass = "Land Scion";
      break;
    case 5:
      scionClass = "Lightning Scion";
      break;
    case 6:
      scionClass = "Mana Scion";
      break;
    case 7:
      scionClass = "Metal Scion";
      break;
    case 8:
      scionClass = "Plant Scion";
      break;
  }

  let canActivateAvelhem = false;

  if (
    localGameState.turnPlayer === self &&
    localGameState.currentResolution[
      localGameState.currentResolution.length - 1
    ].resolution === "Execution Phase"
  ) {
    let scionCount = 0;
    let unmutedPawns = 0;
    for (let unit of localGameState[self].units) {
      if (unit !== null) {
        if (unit.unitClass === scionClass) {
          scionCount += 1;
          if (scionCount > 1) {
            break;
          }
        } else if (!isMuted(unit) && unit.unitClass === "Pawn") {
          unmutedPawns += 1;
        }
      }
    }
    canActivateAvelhem = unmutedPawns > 0 && scionCount < 2;
  }

  console.log(canActivateAvelhem);

  return (
    <div className="handModal-backdrop">
      <div className="handModal">
        <div className="selectedCardModal">
          <div
            className="displayedAvelhem"
            style={{
              backgroundImage: `url(${getImage(
                getAvelhemById(props.selectedAvelhem.avelhem).Name
              )})`,
            }}
          ></div>
          <div className="displayedCardOptions">
            {canActivateAvelhem && (
              <>
                <button className="activateButton">Activate</button>
                <button className="activateButton">Resonate</button>
              </>
            )}
          </div>
        </div>
        <button className="collapseSelected" onClick={() => handleCollapse()}>
          X
        </button>
      </div>
    </div>
  );
};

export default SelectedAvelhem;
