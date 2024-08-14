import React from "react";
import "./Modal.css";

import { updatecontingencySettings } from "../../redux/contingencySettings";

import { useSelector, useDispatch } from "react-redux";
const ContingencySettings = (props) => {
  const { contingencySettings } = useSelector(
    (state) => state.contingencySettings
  );
  const dispatch = useDispatch();

  const handleCollapse = () => {
    props.setOpenContingencySettings(false);
  };

  const handleCheckboxChange = (key) => {
    const contingencySettingsDupe = JSON.parse(
      JSON.stringify(contingencySettings)
    );
    contingencySettingsDupe[key] = !contingencySettingsDupe[key];

    dispatch(updatecontingencySettings(contingencySettingsDupe));
  };

  return (
    <div className="modal-backdrop">
      <div className={`info-modal ${props.demo ? "modal-mobile" : ""}`}>
        <div className="info-modal-header">
          <div className="info-modal-title">Contingency Settings</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="close-modal-button unitInfo-close"
            onClick={() => {
              handleCollapse();
            }}
          >
            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" />
          </svg>
        </div>

        <div className="info-modal-contents scrollable">
          <div>
            Whenever an event triggers a contingent skill that exists in the
            game, Sovereigns will be prompted to respond, regardless of the
            skill’s presence in their hand for the sake of bluffing.
            <br></br>
            <br></br>
            This setting allows one to automatically skip the prompt if no such
            skill exists in their hand, allowing for swifter play.{" "}
            <strong>Unchecked items will skip the prompt</strong> of their
            corresponding contingency type:
            <br></br>
            <br></br>
          </div>
          <br />

          <div className="check-box-list">
            {Object.keys(contingencySettings).map((key) => (
              <div className="check-box-label" key={key}>
                {/* {key} */}
                <input
                  type="checkbox"
                  id={key}
                  name={key}
                  checked={contingencySettings[key]}
                  onChange={() => handleCheckboxChange(key)}
                />
                <label className="" htmlFor={key}>
                  {" "}
                  {key}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContingencySettings;
