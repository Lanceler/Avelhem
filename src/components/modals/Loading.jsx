import React from "react";
import "./Modal.css";

const Loading = () => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Loading...</h2>
      </div>
    </div>
  );
};

export default Loading;
