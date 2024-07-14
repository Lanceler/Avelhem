import React, { useState, useEffect } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

export default function SelectFirstPlayer(props) {
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  let randomChoices = ["host", "guest"];

  const getRandomFromArray = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  const canClick = () => {
    switch (demoGuide) {
      case "Learn1.2":
        return true;
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.2":
        dispatch(updateDemo("Learn1.3"));
        break;
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal column-centered">
        <button
          className={`redButton ${canClick() ? "demoClick" : ""}`}
          onClick={() => {
            props.handleSetFirstPlayer("host");
            handleUpdateDemoGuide();
          }}
        >
          Go First
        </button>
        <button
          className="redButton"
          onClick={() => props.handleSetFirstPlayer("guest")}
        >
          Go Second
        </button>
        <button
          className="redButton"
          onClick={() =>
            props.handleSetFirstPlayer(getRandomFromArray(randomChoices))
          }
        >
          Random
        </button>
      </div>
    </div>
  );
}
