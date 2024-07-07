import React, { useState } from "react";
import "./Modal.css";

import GoldFrame from "../../assets/others/GoldFrame.png";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import { useCardDatabase } from "../../hooks/useCardDatabase";
import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const DefiancePhaseSelection = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { getMiscImage } = useCardImageSwitch();

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
            // "Test.",
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

  const canClick = (element1, element2) => {
    switch (demoGuide) {
      case "Learn1.15":
        return element1 === "skip";

      case "Learn1.185":
      case "Learn1.90":
        return element1 === "select";

      case "Learn1.89":
        return element1 === "Curate";

      case "Learn1.184":
        return element1 === "Ex Machina";
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.15":
        dispatch(updateDemo("Learn1.16"));
        break;

      case "Learn1.89":
        dispatch(updateDemo("Learn1.90"));
        break;

      case "Learn1.90":
        dispatch(updateDemo("Learn1.91"));
        break;

      case "Learn1.184":
        dispatch(updateDemo("Learn1.185"));
        break;

      case "Learn1.185":
        dispatch(updateDemo("Learn1.186"));
        break;
    }
  };
  return (
    <div className="modal-backdrop">
      <div className="modal ">
        <div className="modalHeader">
          <div className="modalTitle">
            Defiance Phase (FD: {localGameState[self].fateDefiances})
          </div>
          <div className="modalButton">
            <button className="choiceButton" onClick={() => handleViewBoard()}>
              View
            </button>
          </div>
        </div>

        <div className="modalContent">
          <div className="threeColumn">
            <div
              className={`modalChoice1 modalChoice2 ${
                selectedChoice === 1 ? "selectedModalChoice" : ""
              } `}
              style={{ backgroundImage: `url(${getMiscImage("GoldFrame")})` }}
              onClick={() => handleSelect(1, canSelect[0])}
            >
              <div
                className={`modalChoiceContent ${
                  canSelect[0] ? "" : "disabledModalChoice"
                } `}
              >
                <div className="modalDefianceContents">
                  <h3 className="modalChoiceName">Arcana</h3>

                  <div
                    className="modalChoiceText modalDefianceText"
                    style={{ fontSize: 18.5 }}
                  >
                    {/* Select up to 4 skills from your hand; place them at the
                    bottom of your repertoire, then draw the same number. */}
                    Place up to 4 skills at the bottom of your repertoire, then
                    draw the same number.
                  </div>

                  <h4 className="modalChoiceText modalDefianceText modalCost">{`Cost: ${defianceCosts[0]} FD`}</h4>
                </div>
              </div>
            </div>

            <div
              className={`modalChoice1 modalChoice2 ${
                selectedChoice === 2 ? "selectedModalChoice" : ""
              } `}
              style={{ backgroundImage: `url(${getMiscImage("GoldFrame")})` }}
              onClick={() => handleSelect(2, canSelect[1])}
            >
              <div
                className={`modalChoiceContent ${
                  canSelect[1] ? "" : "disabledModalChoice"
                } `}
              >
                <div className="modalDefianceContents">
                  <h3 className="modalChoiceName">Backtrack</h3>
                  <div className="modalChoiceText modalDefianceText">
                    Reroll your tactics.
                  </div>

                  <h4 className="modalChoiceText modalDefianceText modalCost">{`Cost: ${defianceCosts[1]} FD`}</h4>
                </div>
              </div>
            </div>

            <div
              className={`modalChoice1 modalChoice2 ${
                selectedChoice === 3 ? "selectedModalChoice" : ""
              } 
              ${canClick("Curate") ? "demoClick" : ""}           `}
              style={{ backgroundImage: `url(${getMiscImage("GoldFrame")})` }}
              onClick={() => {
                handleSelect(3, canSelect[2]);
                handleUpdateDemoGuide();
              }}
            >
              <div
                className={`modalChoiceContent ${
                  canSelect[2] ? "" : "disabledModalChoice"
                } `}
              >
                <div className="modalDefianceContents">
                  <h3 className="modalChoiceName">Curate</h3>
                  <div className="modalChoiceText modalDefianceText">
                    Reroll your tactics with 3 dice; disregard 1.
                  </div>

                  <h4 className="modalChoiceText modalDefianceText modalCost">{`Cost: ${defianceCosts[2]} FD`}</h4>
                </div>
              </div>
            </div>

            <div
              className={`modalChoice1 modalChoice2 ${
                selectedChoice === 4 ? "selectedModalChoice" : ""
              } `}
              style={{ backgroundImage: `url(${getMiscImage("GoldFrame")})` }}
              onClick={() => {
                handleSelect(4, canSelect[3]);
              }}
            >
              <div
                className={`modalChoiceContent ${
                  canSelect[3] ? "" : "disabledModalChoice"
                } `}
              >
                <div className="modalDefianceContents">
                  <h3 className="modalChoiceName">Destine</h3>
                  <div className="modalChoiceText modalDefianceText ">
                    Spend 1 Scion skill to ascend an ally pawn to the matching
                    class.
                  </div>

                  <h4 className="modalChoiceText modalDefianceText modalCost">{`Cost: ${defianceCosts[3]} FD`}</h4>
                </div>
              </div>
            </div>

            <div
              className={`modalChoice1 modalChoice2 ${
                selectedChoice === 5 ? "selectedModalChoice" : ""
              } `}
              style={{ backgroundImage: `url(${getMiscImage("GoldFrame")})` }}
              onClick={() => {
                handleSelect(5, canSelect[4]);
                handleUpdateDemoGuide();
              }}
            >
              <div
                className={`modalChoiceContent ${
                  canSelect[4] ? "" : "disabledModalChoice"
                } 
                ${canClick("Ex Machina") ? "demoClick" : ""}`}
              >
                <div className="modalDefianceContents">
                  <h3 className="modalChoiceName">Ex Machina</h3>
                  <div className="modalChoiceText modalDefianceText ">
                    <span>Search for 1</span>

                    <span>Sovereign skill.</span>
                  </div>

                  <h4 className="modalChoiceText modalDefianceText modalCost">{`Cost: ${defianceCosts[4]} FD`}</h4>
                </div>
              </div>
            </div>

            <div
              className={`modalChoice1 modalChoice2 ${
                selectedChoice === 6 ? "selectedModalChoice" : ""
              } `}
              style={{ backgroundImage: `url(${getMiscImage("GoldFrame")})` }}
              onClick={() => handleSelect(6, canSelect[5])}
            >
              <div
                className={`modalChoiceContent ${
                  canSelect[5] ? "" : "disabledModalChoice"
                } `}
              >
                <div className="modalDefianceContents">
                  <h3 className="modalChoiceName">Finesse</h3>
                  <div className="modalChoiceText modalDefianceText ">
                    <span>Draw 1 skill.</span>

                    <span>You may recover 1 “Transcendence”.</span>
                    {/* Draw 1 skill and recover up to 1 “Transcendence”. */}
                  </div>

                  <h4 className="modalChoiceText modalDefianceText modalCost">{`Cost: ${defianceCosts[5]} FD`}</h4>
                </div>
              </div>
            </div>

            {/* end */}
          </div>
        </div>

        <div className="modalBottomButton">
          {selectedChoice === null && (
            <button
              className={`choiceButton ${canClick("skip") ? "demoClick" : ""}`}
              onClick={() => {
                handleSkip();
                handleUpdateDemoGuide();
              }}
            >
              Skip
            </button>
          )}

          {selectedChoice !== null && (
            <button
              className={`choiceButton ${
                canClick("select") ? "demoClick" : ""
              }`}
              onClick={() => {
                handleProceed();
                handleUpdateDemoGuide();
              }}
            >
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default DefiancePhaseSelection;
