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
          {demoGuide && <h1>{demoGuide}</h1>}
          <div className="demo-board">
            {currentPlayer === "host" && (
              <Board gameState={demoGameState} userRole={"host"} demo={true} />
            )}

            {currentPlayer === "guest" && (
              <Board gameState={demoGameState} userRole={"guest"} demo={true} />
            )}

            <button
              className="choiceButton demo-switch-button"
              onClick={() => changeCurrentPlayer()}
            >
              Switch Player
            </button>
          </div>

          {infoPopUp && (
            <InfoPopUp info={infoPopUp} setInfoPopUp={setInfoPopUp} />
          )}
        </div>
      )}
    </>
  );
}
