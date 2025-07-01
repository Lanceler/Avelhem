import React, { useState } from "react";
import "./Modal.css";
import "./Modal2.scss";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemoCount } from "../../redux/demoCount";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import { useCardDatabase } from "../../hooks/useCardDatabase";

const DefiancePhaseSelection = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);

  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);

  const { sovereignSkillList } = useCardDatabase();

  const { assignTactics, canDestine, drawSkill, endDefiancePhase, rollTactic } =
    useRecurringEffects();

  let newGameState = JSON.parse(JSON.stringify(localGameState));

  const handleSkip = () => {
    // let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState = endDefiancePhase(newGameState);

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  let updateData = true;

  const handleProceed = () => {
    // let newGameState = JSON.parse(JSON.stringify(localGameState));

    // DO NOT pop
    // newGameState.currentResolution.pop();

    switch (selectedChoice) {
      case 1:
        //DO NOT spend DP
        //newGameState[self].defiancePoints -= defianceCosts[0]

        updateData = false;

        newGameState.currentResolution.push({
          resolution: "Defiance Options",
          resolution2: "Artifice",
          player: self,
          details: {
            reason: "Artifice",
            title: "Defiance: Artifice",
            message:
              "Place up to 5 skills from your hand at the bottom of your repertoire, then draw the same number. Skills selected earlier will be placed below subsequent ones.",
            count: 5,
          },
        });
        break;

      case 2:
        //Spend DP
        newGameState[self].defiancePoints -= defianceCosts[1];

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
        //Spend DP
        newGameState[self].defiancePoints -= defianceCosts[2];

        //reroll tactics

        newGameState.currentResolution.push({
          resolution: "Defiance Options",
          resolution2: "Curate Results",
          player: self,
          reroll: [rollTactic(), rollTactic(), rollTactic()],
        });
        break;

      case 4:
        //DO NOT spend DP
        //newGameState[self].defiancePoints -= defianceCosts[3]

        updateData = false;

        newGameState.currentResolution.push({
          resolution: "Defiance Options",
          resolution2: "Destine",
          player: self,
          details: {
            title: "Destine",
            message:
              "Spend 2 DP and 1 Scion skill to ascend an ally pawn to the matching class.",
            restriction: null,
            reason: "Destine",
            defianceCost: defianceCosts[3],
          },
        });
        break;

      case 5:
        //Spend DP
        newGameState[self].defiancePoints -= defianceCosts[4];

        //end defiance Phase
        newGameState = endDefiancePhase(newGameState);

        newGameState.currentResolution.push({
          resolution: "Search Card",
          player: self,
          details: {
            restriction: sovereignSkillList(),
            exclusion: [],
            searchTitle: "Ex Machina",
            searchMessage: "Search for 1 Sovereign Skill",
            outcome: "Add",
            revealTitle: null,
            revealMessage: null,
            messageTitle: "Ex Machina",
            message: "Your opponent has searched for 1 Sovereign skill.",
            specMessage: `${
              self === "host" ? "Gold" : "Silver"
            } Sovereign has searched for 1 Sovereign skill.`,
          },
        });

        break;

      case 6:
        //Spend DP
        newGameState[self].defiancePoints -= defianceCosts[5];

        //end defiance Phase
        newGameState = endDefiancePhase(newGameState);

        newGameState.currentResolution.push({
          resolution: "Defiance Options",
          resolution2: "Finesse",
          player: self,
          details: {
            title: "Finesse",
            reason: "Finesse",
          },
        });

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

  const defianceCosts = [
    localGameState.teaTrial ? 0 : 1,
    localGameState.teaTrial ? 0 : 1,
    2,
    2,
    3,
    4,
  ];

  const canSelect = [
    //Artifice
    newGameState[self].defiancePoints >= defianceCosts[0] &&
      newGameState[self].skillHand.length > 0,
    //Backtrack
    newGameState[self].defiancePoints >= defianceCosts[1] &&
      newGameState.tactics.length > 1,
    //Curate
    newGameState[self].defiancePoints >= defianceCosts[2] &&
      newGameState.tactics.length > 1,
    //Destine
    newGameState[self].defiancePoints >= defianceCosts[3] && canDestine(),

    //Ex Machina
    newGameState[self].defiancePoints >= defianceCosts[4],
    //Finesse
    newGameState[self].defiancePoints >= defianceCosts[5],
  ];

  const defianceOptions = [
    {
      title: "Artifice",
      desc: "Place up to 5 skills at the bottom of your repertoire, then draw the same number.",
    },
    {
      title: "Backtrack",
      desc: "Reroll your tactics.",
    },
    {
      title: "Curate",
      desc: "Reroll your tactics with 3 dice; disregard 1.",
    },
    {
      title: "Destine",
      desc: "Spend 1 Scion skill to ascend an ally pawn to the matching class.",
    },
    {
      title: "Ex Machina",
      desc: (
        <>
          Search for <br />1 Sovereign skill.
        </>
      ),
    },
    {
      title: "Finesse",
      desc: (
        <>
          Draw 1 skill
          <br />
          or deploy a pawn.
        </>
      ),
    },
  ];

  const canClick = (element1, element2) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 31:
            return element1 === 1;
          case 32:
            return element1 === "select";
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 31:
          case 32:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };
  return (
    <div className="modalBackdrop">
      <div className="modalV2">
        <div className="modalHeader2">
          <div className="modalTitle2">
            Defiance Phase (DP: {localGameState[self].defiancePoints})
          </div>
          <div className="modalButton2">
            <button className="yellowButton" onClick={() => handleViewBoard()}>
              View Board
            </button>
          </div>
        </div>

        <div className="modalContent2">
          <div className="modalContentText">You may choose 1:</div>

          <div className="modalContent3Column">
            {defianceOptions.map((d, i) => (
              <div
                key={i}
                className={`modalOptionOutline modalSmallOptionOutline
                            ${
                              selectedChoice === i + 1
                                ? "modalSmallOptionOutlineSelected"
                                : ""
                            }`}
                onClick={() => {
                  handleSelect(i + 1, canSelect[i]);
                  handleUpdateDemoGuide();
                }}
              >
                <div
                  className={`modalSmall ${canSelect[i] ? "" : "disabledModal"} 
                   ${canClick(i) ? "demoClick" : ""}  `}
                  style={{
                    boxShadow: selectedChoice === i + 1 ? "none" : "",
                  }}
                >
                  <div className="modalDefianceContents">
                    <div className="modal-option-title">{d.title}</div>
                    <div
                      className="modal-defiance-text"
                      style={i === 0 ? { fontSize: 17.5 } : {}}
                    >
                      {d.desc}
                    </div>
                    <div className="modalChoiceText modalDefianceText modalCost">{`Cost: ${defianceCosts[i]} DP`}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modalFooter">
          {selectedChoice === null && (
            <button
              className={`redButton2 ${canClick("skip") ? "demoClick" : ""}`}
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
              className={`redButton2 ${canClick("select") ? "demoClick" : ""}`}
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
