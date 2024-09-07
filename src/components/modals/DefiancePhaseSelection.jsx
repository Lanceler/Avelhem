import React, { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import { useCardDatabase } from "../../hooks/useCardDatabase";

const DefiancePhaseSelection = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

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
        //DO NOT spend FD
        //newGameState[self].fateDefiances -= defianceCosts[0]

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
    //Artifice
    newGameState[self].fateDefiances >= defianceCosts[0] &&
      newGameState[self].skillHand.length > 0,
    //Backtrack
    newGameState[self].fateDefiances >= defianceCosts[1] &&
      newGameState.tactics.length > 1,
    //Curate
    newGameState[self].fateDefiances >= defianceCosts[2] &&
      newGameState.tactics.length > 1,
    //Destine
    newGameState[self].fateDefiances >= defianceCosts[3] && canDestine(),

    //Ex Machina
    newGameState[self].fateDefiances >= defianceCosts[4],
    //Finesse
    newGameState[self].fateDefiances >= defianceCosts[5],
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
      desc: "Spend 1 Scion skill to ascend an ally pawn to the matching class",
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
          Draw 1 skill. <br />
          You may recover 1 “Transcendence”
        </>
      ),
    },
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
            <button className="redButton" onClick={() => handleViewBoard()}>
              View
            </button>
          </div>
        </div>

        <br />

        <div className="modalContent">
          <div className="threeColumn">
            {defianceOptions.map((d, i) => (
              <div
                key={i}
                className={`modal-option-outline
                  ${selectedChoice === 1 + i ? "selected-modal-option" : ""} 
                  ${canClick(d.title) ? "demoClick" : ""}                     
              
              `}
                onClick={() => {
                  handleSelect(i + 1, canSelect[i]);
                  handleUpdateDemoGuide();
                }}
              >
                <div
                  className={`modal-option-content modal-option-content-2 ${
                    canSelect[i] ? "" : "disabled-modal-option-content"
                  } `}
                >
                  <div className="modalDefianceContents">
                    <div className="modal-option-title">{d.title}</div>
                    <div
                      className="modal-defiance-text"
                      style={i === 0 ? { fontSize: 17.5 } : {}}
                    >
                      {d.desc}
                    </div>
                    <div className="modalChoiceText modalDefianceText modalCost">{`Cost: ${defianceCosts[i]} FD`}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modalBottomButton">
          {selectedChoice === null && (
            <button
              className={`redButton ${canClick("skip") ? "demoClick" : ""}`}
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
              className={`redButton ${canClick("select") ? "demoClick" : ""}`}
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
