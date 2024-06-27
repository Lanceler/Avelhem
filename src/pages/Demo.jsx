import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Demo.css";

import Board from "../components/Board";

import InfoPopUp from "../components/modals/InfoPopUp";

import { useDemoGameStates } from "../hooks/useDemoGameStates";

import { useSelector, useDispatch } from "react-redux";
import { updateDemo } from "../redux/demoGuide";
import { updatecontingencySettings } from "../redux/contingencySettings";

export const demoSteps = {
  aveleimHand: 1.1,
  resonate: 1.2,
};

export default function Demo() {
  const { id } = useParams(); //note: id was entered as the parameter in the routes of App.jsx
  const navigate = useNavigate();

  const { getDemoGameState, getDemoInstructions } = useDemoGameStates();

  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { contingencySettings } = useSelector(
    (state) => state.contingencySettings
  );
  const dispatch = useDispatch();

  const [demoGameState, setDemoGameState] = useState(null);

  const [demoTitle, setDemoTitle] = useState("Gameplay Demo");

  const [currentPlayer, setCurrentPlayer] = useState("host");
  const [infoPopUp, setInfoPopUp] = useState("game");

  // const [isDemoGuide, setIsDemoGuide] = useState(null);

  useEffect(() => {
    dispatch(
      updatecontingencySettings({
        Activation: true,
        Ascension: true,
        Elimination: true,
        Motion: true,
        Survival: true,
        Target: true,
      })
    );

    if (!id || !["game", "learn", "fire"].includes(id)) {
      // console.log(id);
      navigate("/demo/game");
    } else {
      setDemoGameState(JSON.parse(JSON.stringify(getDemoGameState(id))));

      switch (id) {
        case "game":
          setInfoPopUp("game");
          break;

        case "learn":
          setInfoPopUp("learn");

          //to remove
          setInfoPopUp(null);

          setDemoTitle("Gameplay Tutorial");
          dispatch(updateDemo("Learn1.1"));

          setCurrentPlayer("guest");

          dispatch(
            updatecontingencySettings({
              Activation: false,
              Ascension: false,
              Elimination: false,
              Motion: false,
              Survival: false,
              Target: false,
            })
          );

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
      case "Learn1.82":
      case "Fire1.4":
      case "Fire1.6":
      case "Fire1.33":
      case "Fire1.41":
        return element === "Switch Player Button";
    }
  };

  const demoNextRevealed = () => {
    switch (demoGuide) {
      case "Learn1.1":
      case "Learn1.3":
      case "Learn1.5":
      case "Learn1.6":
      case "Learn1.9":
      case "Learn1.14":
      case "Learn1.16":
      case "Learn1.17":
      case "Learn1.24":
      case "Learn1.27":
      case "Learn1.30":
      case "Learn1.31":
      case "Learn1.37":
      case "Learn1.41":
      case "Learn1.45":
      case "Learn1.47":
      case "Learn1.53":
      case "Learn1.64":
      case "Learn1.65":
      case "Learn1.66":
      case "Learn1.70":
      case "Learn1.71":
      case "Learn1.75":
      case "Learn1.76":
      case "Learn1.77":
      case "Learn1.78":
      case "Learn1.79":
      case "Learn1.79.1":
      case "Learn1.81":
      case "Learn1.98":
      case "Learn1.99":
      case "Learn1.100":
      case "Learn1.105":
      case "Learn1.106":
        return true;
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.1":
        dispatch(updateDemo("Learn1.2"));
        setCurrentPlayer("host");

        break;

      case "Learn1.3":
        dispatch(updateDemo("Learn1.5"));
        break;

      case "Learn1.5":
        dispatch(updateDemo("Learn1.6"));
        break;

      case "Learn1.6":
        dispatch(updateDemo("Learn1.7"));
        break;

      case "Learn1.9":
        dispatch(updateDemo("Learn1.10"));
        break;

      case "Learn1.14":
        dispatch(updateDemo("Learn1.15"));
        break;

      case "Learn1.16":
        dispatch(updateDemo("Learn1.17"));
        break;

      case "Learn1.17":
        dispatch(updateDemo("Learn1.18"));
        break;

      case "Learn1.24":
        dispatch(updateDemo("Learn1.25"));
        break;

      case "Learn1.27":
        dispatch(updateDemo("Learn1.28"));
        break;

      case "Learn1.30":
        dispatch(updateDemo("Learn1.31"));
        break;

      case "Learn1.31":
        dispatch(updateDemo("Learn1.32"));
        break;

      case "Learn1.37":
        dispatch(updateDemo("Learn1.38"));
        break;

      case "Learn1.41":
        dispatch(updateDemo("Learn1.42"));
        break;

      case "Learn1.45":
        dispatch(updateDemo("Learn1.46"));
        break;

      case "Learn1.47":
        dispatch(updateDemo("Learn1.48"));
        break;

      case "Learn1.53":
        dispatch(updateDemo("Learn1.54"));
        break;

      case "Learn1.64":
        dispatch(updateDemo("Learn1.65"));
        break;

      case "Learn1.65":
        dispatch(updateDemo("Learn1.66"));
        break;

      case "Learn1.66":
        dispatch(updateDemo("Learn1.67"));
        break;

      case "Learn1.70":
        dispatch(updateDemo("Learn1.71"));
        break;

      case "Learn1.71":
        dispatch(updateDemo("Learn1.72"));
        break;

      case "Learn1.75":
        dispatch(updateDemo("Learn1.76"));
        break;

      case "Learn1.76":
        dispatch(updateDemo("Learn1.76.1"));
        break;

      case "Learn1.77":
        dispatch(updateDemo("Learn1.78"));
        break;

      case "Learn1.78":
        dispatch(updateDemo("Learn1.79"));
        break;

      case "Learn1.79":
        dispatch(updateDemo("Learn1.79.1"));
        break;

      case "Learn1.79.1":
        dispatch(updateDemo("Learn1.80"));
        break;

      case "Learn1.81":
        dispatch(updateDemo("Learn1.82"));
        break;

      case "Learn1.82":
        dispatch(updateDemo("Learn1.83"));
        break;

      case "Learn1.98":
        dispatch(updateDemo("Learn1.99"));
        break;

      case "Learn1.99":
        dispatch(updateDemo("Learn1.100"));
        break;

      case "Learn1.100":
        dispatch(updateDemo("Learn1.101"));
        break;

      case "Learn1.105":
        dispatch(updateDemo("Learn1.106"));
        break;

      case "Learn1.106":
        dispatch(updateDemo("Learn1.107"));
        break;
      ////////////////////////////////////////////

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

  useEffect(() => {
    if (
      [
        "Learn1.3",
        "Learn1.13",
        "Learn1.20.1",
        "Learn1.34",
        "Learn1.88",
        "Learn1.91",
        "Learn1.105",
      ].includes(demoGuide)
    ) {
      scriptedDemo();
    }
  }, [demoGuide]);

  const scriptedDemo = () => {
    const duplicateDemoGameState = JSON.parse(JSON.stringify(demoGameState));

    switch (demoGuide) {
      case "Learn1.3":
        duplicateDemoGameState.host.skillHand = [
          "SC-04",
          "08-01",
          "06-03",
          "01-02",
          "SX-01",
        ];

        duplicateDemoGameState.guest.skillHand = [
          "07-02",
          "07-02",
          "SB-01",
          "SA-04",
          "SX-01",
          "SX-01",
        ];

        const a = duplicateDemoGameState.host.avelhemRepertoire.length;
        duplicateDemoGameState.host.avelhemRepertoire[a - 1] = 4;
        duplicateDemoGameState.host.avelhemRepertoire[a - 2] = 6;

        duplicateDemoGameState.guest.avelhemRepertoire[a - 1] = 7;
        duplicateDemoGameState.guest.avelhemRepertoire[a - 2] = 8;

        const b = duplicateDemoGameState.host.skillRepertoire.length;
        duplicateDemoGameState.host.skillRepertoire[b - 1] = "SB-05";
        duplicateDemoGameState.host.skillRepertoire[b - 2] = "08-04";
        duplicateDemoGameState.host.skillRepertoire[b - 3] = "04-01";
        duplicateDemoGameState.host.skillRepertoire[b - 4] = "SB-02";
        duplicateDemoGameState.host.skillRepertoire[b - 5] = "02-01";
        duplicateDemoGameState.host.skillRepertoire[b - 6] = "05-01";
        duplicateDemoGameState.host.skillRepertoire[b - 7] = "05-02";
        duplicateDemoGameState.host.skillRepertoire[b - 8] = "04-03";

        duplicateDemoGameState.guest.skillRepertoire[b - 1] = "01-03";
        duplicateDemoGameState.guest.skillRepertoire[b - 2] = "05-03";
        duplicateDemoGameState.guest.skillRepertoire[b - 3] = "SB-05";
        duplicateDemoGameState.guest.skillRepertoire[b - 4] = "SC-01";
        duplicateDemoGameState.guest.skillRepertoire[b - 5] = "SC-04";
        duplicateDemoGameState.guest.skillRepertoire[b - 6] = "08-03";
        duplicateDemoGameState.guest.skillRepertoire[b - 7] = "03-03";
        duplicateDemoGameState.guest.skillRepertoire[b - 8] = "07-01";

        break;

      case "Learn1.13":
        duplicateDemoGameState.tactics = [
          { face: "Advance", limit: 1, stock: 1 },
          { face: "Mobilize", limit: 3, stock: 3 },
        ];
        break;

      case "Learn1.20.1":
      case "Learn1.34":
      case "Learn1.105":
        duplicateDemoGameState.currentResolution.pop();
        duplicateDemoGameState.currentResolution.pop();
        duplicateDemoGameState.activatingSkill.pop();
        duplicateDemoGameState.activatingUnit = [];
        break;

      case "Learn1.88":
        duplicateDemoGameState.tactics = [
          { face: "Invoke", limit: 1, stock: 1 },
          { face: "Invoke", limit: 1, stock: 1 },
        ];
        break;

      case "Learn1.91":
        duplicateDemoGameState.currentResolution[
          duplicateDemoGameState.currentResolution.length - 1
        ].reroll = [
          { face: "Invoke", limit: 1, stock: 1 },
          { face: "Assault", limit: 1, stock: 1 },
          { face: "Advance", limit: 1, stock: 1 },
        ];
        break;

      //////////////////////
    }

    setDemoGameState(duplicateDemoGameState);
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

          <div className="demo-board">
            {currentPlayer === "host" && (
              <Board
                userRole={"host"}
                demo={true}
                demoGame={id === "game"}
                gameState={demoGameState}
                setDemoGameState={setDemoGameState}
              />
            )}

            {currentPlayer === "guest" && (
              <Board
                userRole={"guest"}
                demo={true}
                demoGame={id === "game"}
                gameState={demoGameState}
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
              <>
                <div
                  className={`demo-instructions ${
                    demoGuide === "Learn1.76.1" ? "demo-short" : ""
                  }`}
                >
                  {getDemoInstructions()}
                </div>
                {demoNextRevealed() && (
                  <button
                    className="choiceButton demo-instructions-button demoClick"
                    onClick={() => handleUpdateDemoGuide()}
                  >
                    Next
                  </button>
                )}
              </>
            )}
          </div>

          {infoPopUp && (
            <InfoPopUp info={infoPopUp} setInfoPopUp={setInfoPopUp} />
          )}

          {/* display demoGuide for debugging */}

          {demoGuide && <h1>{demoGuide}</h1>}
        </div>
      )}
    </>
  );
}
