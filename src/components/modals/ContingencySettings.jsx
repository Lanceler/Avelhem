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
    <div className="modal-backdrop unitInfo-text">
      <div className="unitInfoModal ">
        <div className="unitInfoHeader">
          <h2 className="unitInfo-name">Contingency Settings</h2>
          <button
            className="collapseSelected unitInfo-close"
            onClick={() => handleCollapse()}
          >
            X
          </button>
        </div>

        <div>
          Whenever an event triggers a contingent skill that exists in the game,
          Sovereigns will be prompted to respond, regardless of the skill’s
          presence in their hand for the sake of bluffing.
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
      {/* {infoPopUp && <InfoPopUp info={infoPopUp} setInfoPopUp={setInfoPopUp} />} */}
    </div>
  );
};

export default ContingencySettings;
