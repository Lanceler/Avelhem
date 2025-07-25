import React from "react";
import "./Skill.css";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemoCount } from "../../redux/demoCount";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import { useGetImages } from "../../hooks/useGetImages";
import { useCardDatabase } from "../../hooks/useCardDatabase";

const SelectedAvelhem = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);
  const dispatch = useDispatch();

  const { getCardImage } = useGetImages();
  const { getScionSet } = useCardDatabase();

  const { activateAvelhem, activateAvelhemRecover, avelhemToScion, canAscend } =
    useRecurringEffects();

  const scionClass = avelhemToScion(props.selectedAvelhem.avelhem);

  const yourTurn =
    localGameState.turnPlayer === self &&
    localGameState.currentResolution[
      localGameState.currentResolution.length - 1
    ].resolution === "Execution Phase";

  const canRecover =
    yourTurn &&
    localGameState[self].bountyUpgrades.avelhem >= 3 &&
    localGameState[self].defiancePoints >= 2 &&
    getScionSet(scionClass).some((s) =>
      localGameState[self].skillVestige.includes(s)
    );

  const canActivateAvelhem =
    yourTurn && canAscend(localGameState, self, scionClass);

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

  const handleRecover = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState[self].avelhemHand.splice(props.selectedAvelhem.handIndex, 1);

    newGameState = activateAvelhemRecover(
      newGameState,
      props.selectedAvelhem.avelhem
    );

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);

    props.setRaise(false);
    props.setSelectedAvelhem(null);
  };

  const canClick = (element1) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 68:
          case 86:
            return element1 === "Activate Button";
        }
    }

    // return element === "Resonate Button";
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 68:
          case 86:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  return (
    <div className="handModal-backdrop">
      <div className="handModal">
        <div className="selectedCardModal-top">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="close-modal-button "
            style={{ marginTop: 20, marginRight: 20 }}
            onClick={() => {
              handleCollapse();
            }}
          >
            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" />
          </svg>
        </div>

        <div className="selectedCardModal-left">
          <div
            className="displayed-card"
            style={{
              backgroundImage: `url(${getCardImage(
                props.selectedAvelhem.avelhem
              )})`,
            }}
          ></div>
        </div>

        <div className="selectedCardModal-right">
          {canRecover && (
            <>
              <button
                className="redButton selectedCardModal-buttons"
                onClick={() => handleRecover()}
              >
                Recover
              </button>
            </>
          )}
          {/* {canSearch && (
            <>
              <button
                className="redButton selectedCardModal-buttons"
                onClick={() => handleSearch()}
              >
                Search (3 DP)
              </button>
            </>
          )} */}
          {canActivateAvelhem && (
            <>
              <button
                className={`redButton selectedCardModal-buttons ${
                  canClick("Activate Button") ? "demoClick" : ""
                }`}
                onClick={() => {
                  handleActivate();
                  handleUpdateDemoGuide();
                }}
              >
                Activate
              </button>
              <button
                className={`redButton selectedCardModal-buttons ${
                  canClick("Resonate Button") ? "demoClick" : ""
                }`}
                onClick={() => {
                  handleResonate();
                  handleUpdateDemoGuide();
                }}
              >
                Resonate
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectedAvelhem;
