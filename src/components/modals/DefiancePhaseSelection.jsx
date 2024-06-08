import React, { useState } from "react";
import "./Modal.css";

import GoldFrame from "../../assets/others/GoldFrame.png";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import { useCardDatabase } from "../../hooks/useCardDatabase";

const DefiancePhaseSelection = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);

  const { sovereignSkillList } = useCardDatabase();

  const {
    assignTactics,
    canActivateSovereignSkill,
    drawSkill,
    endDefiancePhase,
    rollTactic,
  } = useRecurringEffects();

  const handleSkip = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState = endDefiancePhase(newGameState);

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  let updateData = true;

  const handleProceed = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    // DO NOT pop
    // newGameState.currentResolution.pop();

    switch (selectedChoice) {
      case 1:
        //DO NOT spend FD
        //newGameState[self].fateDefiances -= defianceCosts[0]

        updateData = false;

        newGameState.currentResolution.push({
          resolution: "Defiance Options",
          resolution2: "Arcana",
          player: self,
          details: {
            reason: "Arcana",
            title: "Defiance: Arcana",
            message:
              "Place up to 4 skills from your hand at the bottom of your repertoire, then draw the same number. Skills selected earlier will be placed below subsequent ones.",
            count: 4,
          },
        });
        break;

      case 2:
        //Spend FD
        newGameState[self].fateDefiances -= defianceCosts[1];

        //reroll tactics
        newGameState = assignTactics(newGameState, rollTactic(), rollTactic());

        //end defiance Phase
        newGameState = endDefiancePhase(newGameState);

        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Tactic Results",
          reroll: true,
        });
        break;

      case 3:
        //Spend FD
        newGameState[self].fateDefiances -= defianceCosts[2];

        //reroll tactics

        newGameState.currentResolution.push({
          resolution: "Defiance Options",
          resolution2: "Curate Results",
          player: self,
          reroll: [rollTactic(), rollTactic(), rollTactic()],
        });
        break;

      case 4:
        //DO NOT spend FD
        //newGameState[self].fateDefiances -= defianceCosts[3]

        updateData = false;

        newGameState.currentResolution.push({
          resolution: "Defiance Options",
          resolution2: "Destine",
          player: self,
          defianceCost: defianceCosts[3],
        });
        break;

      case 5:
        //Spend FD
        newGameState[self].fateDefiances -= defianceCosts[4];

        //end defiance Phase
        newGameState = endDefiancePhase(newGameState);

        newGameState.currentResolution.push({
          resolution: "Search Skill",
          player: self,
          restriction: sovereignSkillList(),
          message: "Search for 1 Sovereign Skill.",
          outcome: "Add",
        });

        break;

      case 6:
        //Spend FD
        newGameState[self].fateDefiances -= defianceCosts[5];

        //draw 1 skill
        newGameState = drawSkill(newGameState);

        //end defiance Phase
        newGameState = endDefiancePhase(newGameState);

        if (newGameState[self].skillVestige.includes("SX-01")) {
          newGameState.currentResolution.push({
            resolution: "Recover Skill",
            player: self,
            restriction: ["SX-01"],
            message: "You may recover 1 “Transcendence”",
            outcome: "Add",
            canSkip: true,
          });
        }

        break;

      default:
        break;
    }

    dispatch(updateState(newGameState));

    if (updateData) {
      props.updateFirebase(newGameState);
    }
  };

  const handleSelect = (i, condition) => {
    if (selectedChoice === i) {
      setSelectedChoice(null);
    } else if (condition) {
      setSelectedChoice(i);
    }
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const defianceCosts = [1, 1, 2, 3, 3, 4];

  const canSelect = [
    //Arcana
    localGameState[self].fateDefiances >= defianceCosts[0] &&
      localGameState[self].skillHand.length > 0,
    //Backtrack
    localGameState[self].fateDefiances >= defianceCosts[1] &&
      localGameState.tactics.length > 1,
    //Curate
    localGameState[self].fateDefiances >= defianceCosts[2] &&
      localGameState.tactics.length > 1,
    //Destine (Power at the Final Hour has the same activation requirement)
    localGameState[self].fateDefiances >= defianceCosts[3] &&
      canActivateSovereignSkill("SC-01"),
    //Ex Machina
    localGameState[self].fateDefiances >= defianceCosts[4],
    //Finesse
    localGameState[self].fateDefiances >= defianceCosts[5],
  ];

  // console.log(canFrontier);
  // console.log(canAcquisition);

  return (
    <div className="modal-backdrop">
      <div className="modal ">
        <div className="twoColumn">
          <h2 className="choiceTitle">
            Defiance Phase (FD: {localGameState[self].fateDefiances})
          </h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <div className="scrollable scrollable-y-only">
          {/* <h3>Defy Fate</h3> */}
          <div className="threeColumn">
            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 1 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 245.5 }}
              onClick={() => handleSelect(1, canSelect[0])}
            >
              <div
                className={`customChoiceFrame ${
                  canSelect[0] ? "" : "disabledChoice"
                } `}
              >
                <div className="defianceText">
                  <h4 className="defianceTitle">Arcana</h4>
                  <h3 className="defianceDescription defianceDescriptionSmall">
                    Select up to 4 skills from your hand; place them at the
                    bottom of your repertoire, then draw the same number.
                  </h3>

                  <h4 className="fdCost">{`Cost: ${defianceCosts[0]} FD`}</h4>
                </div>
              </div>
            </div>

            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 2 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 245.5 }}
              onClick={() => handleSelect(2, canSelect[1])}
            >
              <div
                className={`customChoiceFrame ${
                  canSelect[1] ? "" : "disabledChoice"
                } `}
              >
                <div className="defianceText">
                  <h4 className="defianceTitle">Backtrack</h4>
                  <h3 className="defianceDescription">Reroll your tactics.</h3>

                  <h4 className="fdCost">{`Cost: ${defianceCosts[1]} FD`}</h4>
                </div>
              </div>
            </div>

            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 3 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 245.5 }}
              onClick={() => handleSelect(3, canSelect[2])}
            >
              <div
                className={`customChoiceFrame ${
                  canSelect[2] ? "" : "disabledChoice"
                } `}
              >
                <div className="defianceText">
                  <h4 className="defianceTitle">Curate</h4>
                  <h3 className="defianceDescription">
                    Reroll your tactics with 3 dice; disregard 1.
                  </h3>

                  <h4 className="fdCost">{`Cost: ${defianceCosts[2]} FD`}</h4>
                </div>
              </div>
            </div>

            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 4 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 245.5 }}
              onClick={() => handleSelect(4, canSelect[3])}
            >
              <div
                className={`customChoiceFrame ${
                  canSelect[3] ? "" : "disabledChoice"
                } `}
              >
                <div className="defianceText">
                  <h4 className="defianceTitle">Destine</h4>
                  <h3 className="defianceDescription ">
                    Spend 1 Scion skill to ascend an ally pawn to the matching
                    class.
                  </h3>

                  <h4 className="fdCost">{`Cost: ${defianceCosts[3]} FD`}</h4>
                </div>
              </div>
            </div>

            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 5 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 245.5 }}
              onClick={() => handleSelect(5, canSelect[4])}
            >
              <div
                className={`customChoiceFrame ${
                  canSelect[4] ? "" : "disabledChoice"
                } `}
              >
                <div className="defianceText">
                  <h4 className="defianceTitle">Ex Machina</h4>
                  <h3 className="defianceDescription ">
                    <span>Search for 1</span>
                    <br />
                    <span>Sovereign skill.</span>
                  </h3>

                  <h4 className="fdCost">{`Cost: ${defianceCosts[4]} FD`}</h4>
                </div>
              </div>
            </div>

            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 6 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 245.5 }}
              onClick={() => handleSelect(6, canSelect[5])}
            >
              <div
                className={`customChoiceFrame ${
                  canSelect[5] ? "" : "disabledChoice"
                } `}
              >
                <div className="defianceText">
                  <h4 className="defianceTitle">Finesse</h4>
                  <h3 className="defianceDescription ">
                    <span>Draw 1 skill.</span>
                    <br />
                    <span>You may recover 1 “Transcendence”.</span>
                  </h3>

                  <h4 className="fdCost">{`Cost: ${defianceCosts[5]} FD`}</h4>
                </div>
              </div>
            </div>

            {/* end */}
          </div>
        </div>

        <div>
          {selectedChoice === null && (
            <button className="choiceButton" onClick={() => handleSkip()}>
              Skip
            </button>
          )}

          {selectedChoice !== null && (
            <button className="choiceButton" onClick={() => handleProceed()}>
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default DefiancePhaseSelection;
