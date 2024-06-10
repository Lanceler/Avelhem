import React from "react";

export default function SelectFirstPlayer(props) {
  let randomChoices = ["host", "guest"];

  const getRandomFromArray = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  return (
    <div className="modal-backdrop">
      <div className="modal column-centered">
        <button
          className="choiceButton"
          onClick={() => props.handleSetFirstPlayer("host")}
        >
          Go First
        </button>
        <button
          className="choiceButton"
          onClick={() => props.handleSetFirstPlayer("guest")}
        >
          Go Second
        </button>
        <button
          className="choiceButton"
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
