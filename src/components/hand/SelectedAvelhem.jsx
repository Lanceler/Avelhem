import React from "react";
import "./Skill.css";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";
import { useCardDatabase } from "../../hooks/useCardDatabase";

const SelectedAvelhem = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const { getImage2 } = useCardImageSwitch();
  const { getScionSet } = useCardDatabase();

  const { activateAvelhem, avelhemToScion, canAscend, isMuted } =
    useRecurringEffects();

  const scionClass = avelhemToScion(props.selectedAvelhem.avelhem);

  const yourTurn =
    localGameState.turnPlayer === self &&
    localGameState.currentResolution[
      localGameState.currentResolution.length - 1
    ].resolution === "Execution Phase";

  const canSearch =
    yourTurn &&
    localGameState[self].bountyUpgrades.avelhem >= 2 &&
    // !localGameState[self].hasAvelhemSearch &&
    localGameState[self].fateDefiances >= 3;

  const canRecover =
    yourTurn &&
    localGameState[self].bountyUpgrades.avelhem >= 4 &&
    // !localGameState[self].hasAvelhemRecover &&
    localGameState[self].fateDefiances >= 3 &&
    getScionSet(scionClass).some((s) =>
      localGameState[self].skillVestige.includes(s)
    );

  const canActivateAvelhem =
    yourTurn && canAscend(localGameState, self, scionClass);

  const handleRecover = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //Remove Avelhem from hand AND send to vestige
    newGameState[self].avelhemVestige.push(
      newGameState[self].avelhemHand.splice(
        props.selectedAvelhem.handIndex,
        1
      )[0]
    );

    newGameState[self].hasAvelhemRecover = true;
    newGameState[self].fateDefiances -= 3;

    newGameState.currentResolution.push({
      resolution: "Recover Skill",
      player: self,
      restriction: getScionSet(scionClass),
      message: `Recover 1 ${scionClass.replace(" Scion", "")} skill.`,
      outcome: "Add",
    });

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);

    props.setRaise(false);
    props.setSelectedAvelhem(null);
  };

  const handleSearch = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //Remove Avelhem from hand AND send to vestige
    newGameState[self].avelhemVestige.push(
      newGameState[self].avelhemHand.splice(
        props.selectedAvelhem.handIndex,
        1
      )[0]
    );

    newGameState[self].hasAvelhemSearch = true;
    newGameState[self].fateDefiances -= 3;

    newGameState.currentResolution.push({
      resolution: "Search Skill",
      player: self,
      restriction: getScionSet(scionClass).filter((s) => s[4] !== "4"),
      message: `Search for 1 non-burst ${scionClass.replace(
        " Scion",
        ""
      )} skill.`,
      outcome: "Add",
    });

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);

    props.setRaise(false);
    props.setSelectedAvelhem(null);
  };

  const handleActivate = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState[self].avelhemHand.splice(props.selectedAvelhem.handIndex, 1);

    newGameState = activateAvelhem(
      newGameState,
      props.selectedAvelhem.avelhem,
      null
    );

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);

    props.setRaise(false);
    props.setSelectedAvelhem(null);
  };

  const handleCollapse = () => {
    props.setSelectedAvelhem(null);
  };

  const handleResonate = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.push({
      resolution: "Choose Resonator Avelhem",
      player: self,
      avelhem: props.selectedAvelhem,
    });

    props.setRaise(false);
    props.setSelectedAvelhem(null);

    dispatch(updateState(newGameState));
  };

  const canClick = (element) => {
    switch (demoGuide) {
      case "Fire1.1":
        switch (element) {
          case "Resonate Button":
            return true;
        }

        break;
    }
  };

  return (
    <div className="handModal-backdrop">
      <div className="handModal">
        <div className="selectedCardModal">
          <div
            className="displayedAvelhem"
            style={{
              backgroundImage: `url(${getImage2(
                props.selectedAvelhem.avelhem
              )})`,
            }}
          ></div>

          <div className="displayedCardOptions">
            {canRecover && (
              <>
                <button
                  className="activateButton displayCardButton"
                  onClick={() => handleRecover()}
                >
                  Recover (3 FD)
                </button>
              </>
            )}
            {canSearch && (
              <>
                <button
                  className="activateButton displayCardButton"
                  onClick={() => handleSearch()}
                >
                  Search (3 FD)
                </button>
              </>
            )}
            {canActivateAvelhem && (
              <>
                <button
                  className="activateButton displayCardButton"
                  onClick={() => handleActivate()}
                >
                  Activate
                </button>
                <button
                  // className="activateButton displayCardButton"

                  className={`activateButton displayCardButton ${
                    canClick("Resonate Button") ? "demoClick" : ""
                  }`}
                  onClick={() => handleResonate()}
                >
                  Resonate
                </button>
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
