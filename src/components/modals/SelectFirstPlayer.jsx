import React from "react";

export default function SelectFirstPlayer(props) {
  let randomChoices = ["host", "guest"];

  const getRandomFromArray = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button onClick={() => props.onSetFirstPlayer("host")}>Go First</button>
        <button onClick={() => props.onSetFirstPlayer("guest")}>
          Go Second
        </button>
        <button
          onClick={() =>
            props.onSetFirstPlayer(getRandomFromArray(randomChoices))
          }
        >
          Random
        </button>
      </div>
    </div>
  );
}
