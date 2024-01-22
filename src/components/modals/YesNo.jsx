import React from "react";
import "./YesNo.css";

const YesNo = (props) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{props.message}</h2>
        <button onClick={() => props.getResponse(true)}>Yes</button>
        <button onClick={() => props.getResponse(false)}>No</button>
      </div>
    </div>
  );
};

export default YesNo;
