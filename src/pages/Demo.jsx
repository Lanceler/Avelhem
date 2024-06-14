import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Demo.css";

import Board from "../components/Board";

import InfoPopUp from "../components/modals/InfoPopUp";

import { useDemoGameStates } from "../hooks/useDemoGameStates";

import { useSelector, useDispatch } from "react-redux";
import { updateDemo } from "../redux/demoGuide";

export const demoSteps = {
  aveleimHand: 1.1,
  resonate: 1.2,
};

export default function Demo() {
  const { id } = useParams(); //note: id was entered as the parameter in the routes of App.jsx
  const navigate = useNavigate();

  const { getDemoGameState } = useDemoGameStates();

  const { demoGuide } = useSelector((state) => state.demoGuide);
  const dispatch = useDispatch();

  const [demoGameState, setDemoGameState] = useState(null);

  const [demoTitle, setDemoTitle] = useState("Gameplay Demo");

  const [currentPlayer, setCurrentPlayer] = useState("host");
  const [infoPopUp, setInfoPopUp] = useState("game");

  // const [isDemoGuide, setIsDemoGuide] = useState(null);

  useEffect(() => {
    if (!id || !["game", "fire"].includes(id)) {
      console.log(id);
      navigate("/demo/game");
    } else {
      setDemoGameState(JSON.parse(JSON.stringify(getDemoGameState(id))));

      switch (id) {
        case "game":
          setInfoPopUp("game");
          // dispatch(updateDemo(false));

          break;

        case "fire":
          setInfoPopUp("fire");
          setDemoTitle("Fire Scion Demo");
          dispatch(updateDemo("Fire1.1"));

          break;
      }
    }
  }, [id]);

  const changeCurrentPlayer = () => {
    if (currentPlayer === "host") {
      setCurrentPlayer("guest");
    } else {
      setCurrentPlayer("host");
    }
  };

  const canClick = (element) => {
    switch (demoGuide) {
      case "Fire1.4":
      case "Fire1.6":
      case "Fire1.33":
      case "Fire1.41":
        switch (element) {
          case "Switch Player Button":
            return true;
        }
        break;
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Fire1.4":
        dispatch(updateDemo("Fire1.5"));
        break;

      case "Fire1.6":
        dispatch(updateDemo("Fire1.7"));
        break;

      case "Fire1.33":
        dispatch(updateDemo("Fire1.34"));
        break;

      case "Fire1.41":
        dispatch(updateDemo("Fire1.42"));
        break;
    }
  };

  const displayedInstructions = () => {
    switch (demoGuide) {
      case "Fire1.1":
      case "Fire1.2":
        return "1. Click on your Avelhem hand to raise it, then click on either Fire Avelhem; resonate it with the other copy to ascend your pawn.";

      case "Fire1.2.1":
      case "Fire1.3":
        return "2. Flash Fire (their debut talent) will activate, giving you 2 options. Select “Gain 2 Fevers.” (The other option of recovering a Fire skill will not be available because there are no Fire skills in your Vestige.)";

      case "Fire1.4":
      case "Fire1.5":
      case "Fire1.6":
        return "3. Switch player, then press skip at the prompt. Then switch back to the first player.";

      case "Fire1.7":
        return "4. Because you resonated an Avelhem, you may either discard or shuffle it back in your repertoire. For this demo, you may do either.";

      case "Fire1.8":
      case "Fire1.9":
      case "Fire1.10":
      case "Fire1.11":
        return "5. Click on the Fire Scion that just ascended and view their abilities (bottom right). Activate “Fiery Heart”. This will require you to spend 1 Fever or skill; for this demo, spend the latter. Select “Transcendence” (a card that literally does nothing).";

      case "Fire1.12":
        return "6. Click on your ally Metal Scion, who is currently afflicted with Frostbite; as per the effect of ”Fiery Heart”, they will be thawed from the ice.";

      case "Fire1.13":
      case "Fire1.14":
        return "7. Click on the Fire Scion again, then activate their other ability: Afterburner. It will require the use of an Invoke tactic, as well as either 2 Fevers or 1 skill. This time, spend Fever. Without clicking on any cards, click on the “Spend 2 Fever” button.";

      case "Fire1.15":
        return "8. Click on the enemy pawn to strike them as per Afterburner’s effect.";

      case "Fire1.16":
      case "Fire1.17":
        return "9. Prompt the same Fire Scion activate a skill (bottom left). Activate their burst skill: Resplendence. There is the option to ignite an adjacent enemy; however, the only enemy is range is a Water Scion that is immune to burn. Therefore, press skip.";

      case "Fire1.18":
      case "Fire1.19":
      case "Fire1.20":
      case "Fire1.21":
      case "Fire1.22":
        return "10. Prompt the Fire Scion to activate their standard skill: Ignition Propulsion. Spend “Transcendence” and choose “strike” to attack the Water Scion.";

      case "Fire1.23":
      case "Fire1.24":
      case "Fire1.25":
        return "11. Prompt the Fire Scion to use a tactic (top right) and select Mobilize. Have them traverse forward into the opponent’s base.";

      case "Fire1.26":
      case "Fire1.27":
      case "Fire1.28":
      case "Fire1.29":
      case "Fire1.30":
        return "12. Select your other Fire Scion and prompt them to resonate their resonant skill: Conflagration. When selecting a resonator, use “Tea For Two”. You must spend a skill, select “Healing Rain.” Click on either Land Scion to attack them.";

      case "Fire1.31":
      case "Fire1.32":
        return "13. Prompt your Metal Scion to activate their burst skill: Arsenal Onslaught. Attack the enemy Fire Scion.";

      case "Fire1.33":
      case "Fire1.34":
      case "Fire1.35":
      case "Fire1.36":
        return "14. Switch player, then prompt the Fire Scion to activate their contingent skill: Blaze of Glory. Ignite the Metal Scion, then draw 1 skill when given the option.";

      case "Fire1.36.1":
      case "Fire1.37":
      case "Fire1.38":
      case "Fire1.39":
      case "Fire1.40":
        return "15. Activate Vengeful Legacy, then click on the pawn to ascend them to a Fire Scion. Flash Fire will activate; this time, the second option (recovering a Fire skill) is available. Click on it and spend any skill, then recover “Blaze Of Glory.”";

      case "Fire1.40.1":
        return "16. As per Vengeful Legacy’s effect, you may float a skill to grant the Fire Scion the Ravager status. Press skip.";

      case "Fire1.41":
      case "Fire1.42":
      case "Fire1.43":
      case "Fire1.44":
      case "Fire1.45":
        return "17. Switch back to the gold player. You will be given the option to reveal a metal skill; since you have none, press skip. You will be then given the option to spend a skill to attack again. Spend “Chain Lightning”, then strike the enemy Fire Scion.";

      case "Fire1.45.1":
      case "Fire1.46":
        return "18. Press “End Turn”, then follow the instructions until the victory screen. This ends the demo.";

      // space
    }
  };

  return (
    <>
      {demoGameState && (
        <div
          // className={`demo-body`}
          className={`demo-body ${demoGuide ? "demoBlocker" : ""}`}
        >
          <h1 className="demo-header">
            {demoTitle}{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="question-icon"
              onClick={() => setInfoPopUp(id)}
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
            </svg>
          </h1>
          <br></br>

          {/* display demoGuide for debugging */}

          {/* {demoGuide && <h1>{demoGuide}</h1>} */}

          <div className="demo-board">
            {currentPlayer === "host" && (
              <Board
                gameState={demoGameState}
                userRole={"host"}
                demo={true}
                setDemoGameState={setDemoGameState}
              />
            )}

            {currentPlayer === "guest" && (
              <Board
                gameState={demoGameState}
                userRole={"guest"}
                demo={true}
                setDemoGameState={setDemoGameState}
              />
            )}

            <button
              className={`choiceButton demo-switch-button ${
                canClick("Switch Player Button") ? "demoClick" : ""
              }`}
              onClick={() => {
                changeCurrentPlayer();
                handleUpdateDemoGuide();
              }}
            >
              Switch Player
            </button>

            {demoGuide && (
              <div className="demo-instructions">
                <p> {displayedInstructions()}</p>
              </div>
            )}
          </div>

          {infoPopUp && (
            <InfoPopUp info={infoPopUp} setInfoPopUp={setInfoPopUp} />
          )}
        </div>
      )}
    </>
  );
}
