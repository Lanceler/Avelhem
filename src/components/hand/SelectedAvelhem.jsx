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

  const { activateAvelhem, avelhemToScion, getZonesForPromotion, isMuted } =
    useRecurringEffects();

  const scionClass = avelhemToScion(props.selectedAvelhem.avelhem);

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

  //console.log(canActivateAvelhem);

  const handleActivate = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState[self].avelhemHand.splice(props.selectedAvelhem.handIndex, 1);

    newGameState = activateAvelhem(newGameState, props.selectedAvelhem.avelhem);

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);

    props.setSelectedAvelhem(null);
  };

  const handleCollapse = () => {
    props.setSelectedAvelhem(null);
  };

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
                <button
                  className="activateButton"
                  onClick={() => handleActivate()}
                >
                  Activate
                </button>
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
