import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Demo.css";

import BoardArea from "../components/BoardArea";

import InfoPopUp from "../components/modals/InfoPopUp";

import { useDemoGameStates } from "../hooks/useDemoGameStates";

import { useSelector, useDispatch } from "react-redux";
import { updateDemo } from "../redux/demoGuide";
import { updatecontingencySettings } from "../redux/contingencySettings";

import { useGetImages } from "../hooks/useGetImages";

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

  const { getBannerImage } = useGetImages();

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
          setCurrentPlayer("host");
          setDemoTitle("Gameplay Demo");
          dispatch(updateDemo(null));
          break;

        case "learn":
          setInfoPopUp("learn");
          setCurrentPlayer("guest");
          setDemoTitle("Gameplay Tutorial");

          dispatch(updateDemo("Learn1.1"));

          dispatch(
            updatecontingencySettings({
              Activation: false,
              Ascension: false,
              Elimination: false,
              Motion: false,
              Survival: false,
              Target: true,
            })
          );
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
      case "Learn1.135":
      case "Learn1.145":
      case "Learn1.155":
      case "Learn1.167":
      case "Learn1.173.1":
      case "Learn1.202":
      case "Learn1.204":
      case "Learn1.263":
      case "Learn1.266":
        return element === "Switch Player Button";
    }
  };

  const demoNextRevealed = () => {
    switch (demoGuide) {
      case "Learn1.1.1":
      case "Learn1.1.2":
      case "Learn1.1.3":
      case "Learn1.1.4":
      case "Learn1.1.5":
      case "Learn1.1.6":
      case "Learn1.3":
      case "Learn1.5":
      case "Learn1.6":
      case "Learn1.8.1":
      case "Learn1.8.2":
      case "Learn1.9":
      case "Learn1.13":
      case "Learn1.14":
      case "Learn1.16":
      case "Learn1.17":
      case "Learn1.17.1":
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
      case "Learn1.79.1.1":
      case "Learn1.79.2":
      case "Learn1.79.3":
      case "Learn1.79.4":
      case "Learn1.79.5":
      case "Learn1.79.6":
      case "Learn1.79.7":
      case "Learn1.79.8":
      case "Learn1.81":
      case "Learn1.98":
      case "Learn1.99":
      case "Learn1.100":
      case "Learn1.103.1":
      case "Learn1.104":
      case "Learn1.105":
      case "Learn1.113":
      case "Learn1.114":
      case "Learn1.119":
      case "Learn1.121":
      case "Learn1.130":
      case "Learn1.131":
      case "Learn1.136":
      case "Learn1.137":
      case "Learn1.138":
      case "Learn1.142":
      case "Learn1.157":
      case "Learn1.161":
      case "Learn1.162":
      case "Learn1.168":
      case "Learn1.168.1":
      case "Learn1.169":
      case "Learn1.169.1":
      case "Learn1.170":
      case "Learn1.170.1":
      case "Learn1.171":
      case "Learn1.190":
      case "Learn1.197":
      case "Learn1.200":
      case "Learn1.201":
      case "Learn1.205":
      case "Learn1.212":
      case "Learn1.216":
      case "Learn1.216.2":
      case "Learn1.220":
      case "Learn1.221":
      case "Learn1.222":
      case "Learn1.223":
      case "Learn1.224":
      case "Learn1.228":
      case "Learn1.229":
      case "Learn1.241":
      case "Learn1.248":
      case "Learn1.249":
      case "Learn1.255":
      case "Learn1.256":
      case "Learn1.257":
      case "Learn1.265":
      case "Learn1.267":
      case "Learn1.268":
      case "Learn1.275":
      case "Learn1.276":
      case "Learn1.277":
        return true;
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.1.1":
        dispatch(updateDemo("Learn1.1.2"));
        break;

      case "Learn1.1.2":
        dispatch(updateDemo("Learn1.1.3"));
        break;

      case "Learn1.1.3":
        dispatch(updateDemo("Learn1.1.4"));
        break;

      case "Learn1.1.4":
        dispatch(updateDemo("Learn1.1.5"));
        break;

      case "Learn1.1.5":
        dispatch(updateDemo("Learn1.1.6"));
        break;

      case "Learn1.1.6":
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

      case "Learn1.8.1":
        dispatch(updateDemo("Learn1.8.2"));
        break;

      case "Learn1.8.2":
        dispatch(updateDemo("Learn1.9"));
        break;

      case "Learn1.9":
        dispatch(updateDemo("Learn1.10"));
        break;

      case "Learn1.13":
        dispatch(updateDemo("Learn1.13.1"));
        break;

      case "Learn1.14":
        dispatch(updateDemo("Learn1.15"));
        break;

      case "Learn1.16":
        dispatch(updateDemo("Learn1.17"));
        break;

      case "Learn1.17":
        dispatch(updateDemo("Learn1.17.1"));
        break;

      case "Learn1.17.1":
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
        dispatch(updateDemo("Learn1.79.1.1"));
        break;

      case "Learn1.79.1.1":
        dispatch(updateDemo("Learn1.79.2"));
        break;

      case "Learn1.79.2":
        dispatch(updateDemo("Learn1.79.3"));
        break;

      case "Learn1.79.3":
        dispatch(updateDemo("Learn1.79.4"));
        break;

      case "Learn1.79.4":
        dispatch(updateDemo("Learn1.79.5"));
        break;

      case "Learn1.79.5":
        dispatch(updateDemo("Learn1.79.6"));
        break;

      case "Learn1.79.6":
        dispatch(updateDemo("Learn1.79.7"));
        break;

      case "Learn1.79.7":
        dispatch(updateDemo("Learn1.79.8"));
        break;

      case "Learn1.79.8":
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

      case "Learn1.103.1":
        dispatch(updateDemo("Learn1.104"));
        break;

      case "Learn1.104":
        dispatch(updateDemo("Learn1.105"));
        break;

      case "Learn1.105":
        dispatch(updateDemo("Learn1.106"));
        break;

      case "Learn1.113":
        dispatch(updateDemo("Learn1.114"));
        break;

      case "Learn1.114":
        dispatch(updateDemo("Learn1.115"));
        break;

      case "Learn1.118":
        dispatch(updateDemo("Learn1.119"));
        break;

      case "Learn1.119":
        dispatch(updateDemo("Learn1.120"));
        break;

      case "Learn1.121":
        dispatch(updateDemo("Learn1.122"));
        break;

      case "Learn1.130":
        dispatch(updateDemo("Learn1.131"));
        break;

      case "Learn1.131":
        dispatch(updateDemo("Learn1.132"));
        break;

      case "Learn1.135":
        dispatch(updateDemo("Learn1.136"));
        break;

      case "Learn1.136":
        dispatch(updateDemo("Learn1.137"));
        break;

      case "Learn1.137":
        dispatch(updateDemo("Learn1.138"));
        break;

      case "Learn1.138":
        dispatch(updateDemo("Learn1.139"));
        break;

      case "Learn1.142":
        dispatch(updateDemo("Learn1.143"));
        break;

      case "Learn1.145":
        dispatch(updateDemo("Learn1.146"));
        break;

      case "Learn1.155":
        dispatch(updateDemo("Learn1.156"));
        break;

      case "Learn1.157":
        dispatch(updateDemo("Learn1.158"));
        break;

      case "Learn1.161":
        dispatch(updateDemo("Learn1.162"));
        break;

      case "Learn1.162":
        dispatch(updateDemo("Learn1.163"));
        break;

      case "Learn1.167":
        dispatch(updateDemo("Learn1.168"));
        break;

      case "Learn1.168":
        dispatch(updateDemo("Learn1.168.1"));
        break;

      case "Learn1.168.1":
        dispatch(updateDemo("Learn1.169"));
        break;

      case "Learn1.169":
        dispatch(updateDemo("Learn1.169.1"));
        break;

      case "Learn1.169.1":
        dispatch(updateDemo("Learn1.170"));
        break;

      case "Learn1.170":
        dispatch(updateDemo("Learn1.170.1"));
        break;

      case "Learn1.170.1":
        dispatch(updateDemo("Learn1.171"));
        break;

      case "Learn1.171":
        dispatch(updateDemo("Learn1.172"));
        break;

      case "Learn1.172":
        dispatch(updateDemo("Learn1.173"));
        break;

      case "Learn1.173.1":
        dispatch(updateDemo("Learn1.174"));
        break;

      case "Learn1.190":
        dispatch(updateDemo("Learn1.191"));
        break;

      case "Learn1.197":
        dispatch(updateDemo("Learn1.198"));
        break;

      case "Learn1.200":
        dispatch(updateDemo("Learn1.201"));
        break;

      case "Learn1.201":
        dispatch(updateDemo("Learn1.202"));
        break;

      case "Learn1.202":
        dispatch(updateDemo("Learn1.203"));
        break;

      case "Learn1.204":
        dispatch(updateDemo("Learn1.205"));
        break;

      case "Learn1.205":
        dispatch(updateDemo("Learn1.206"));
        break;

      case "Learn1.212":
        dispatch(updateDemo("Learn1.213"));
        break;

      case "Learn1.216":
        dispatch(updateDemo("Learn1.216.1"));
        break;

      case "Learn1.216.2":
        dispatch(updateDemo("Learn1.217"));
        break;

      case "Learn1.220":
        dispatch(updateDemo("Learn1.221"));
        break;

      case "Learn1.221":
        dispatch(updateDemo("Learn1.222"));
        break;

      case "Learn1.222":
        dispatch(updateDemo("Learn1.223"));
        break;

      case "Learn1.223":
        dispatch(updateDemo("Learn1.224"));
        break;

      case "Learn1.224":
        dispatch(updateDemo("Learn1.225"));
        break;

      case "Learn1.228":
        dispatch(updateDemo("Learn1.229"));
        break;

      case "Learn1.229":
        dispatch(updateDemo("Learn1.229.1"));
        break;

      case "Learn1.241":
        dispatch(updateDemo("Learn1.242"));
        break;

      case "Learn1.248":
        dispatch(updateDemo("Learn1.249"));
        break;

      case "Learn1.249":
        dispatch(updateDemo("Learn1.250"));
        break;

      case "Learn1.255":
        dispatch(updateDemo("Learn1.256"));
        break;

      case "Learn1.256":
        dispatch(updateDemo("Learn1.257"));
        break;

      case "Learn1.257":
        dispatch(updateDemo("Learn1.258"));
        break;

      case "Learn1.263":
        dispatch(updateDemo("Learn1.264"));
        break;

      case "Learn1.265":
        dispatch(updateDemo("Learn1.266"));
        break;

      case "Learn1.266":
        dispatch(updateDemo("Learn1.267"));
        break;

      case "Learn1.267":
        dispatch(updateDemo("Learn1.268"));
        break;

      case "Learn1.268":
        dispatch(updateDemo("Learn1.269"));
        break;

      case "Learn1.275":
        dispatch(updateDemo("Learn1.276"));
        break;

      case "Learn1.276":
        dispatch(updateDemo("Learn1.277"));
        break;

      case "Learn1.277":
        dispatch(updateDemo("Learn1.278"));
        break;

      ////////////////////////////////////////////
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
        "Learn1.104",
        "Learn1.124",
        "Learn1.159",
        "Learn1.165",
        "Learn1.176",
        "Learn1.183",
        "Learn1.188",
        "Learn1.198",
        "Learn1.204",
        "Learn1.216.1",
        "Learn1.249",
        "Learn1.250",
        "Learn1.269",
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
      case "Learn1.104":
        duplicateDemoGameState.currentResolution.pop();
        duplicateDemoGameState.currentResolution.pop();
        duplicateDemoGameState.activatingSkill.pop();
        duplicateDemoGameState.activatingUnit = [];
        break;

      case "Learn1.165":
        duplicateDemoGameState.currentResolution.pop();
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

      case "Learn1.124":
        const c = duplicateDemoGameState.guest.skillRepertoire.length;

        duplicateDemoGameState.guest.skillRepertoire[c - 2] = "03-04";
        duplicateDemoGameState.guest.skillRepertoire[c - 3] = "SA-03";
        duplicateDemoGameState.guest.skillRepertoire[c - 4] = "07-03";
        duplicateDemoGameState.guest.skillRepertoire[c - 5] = "05-03";

        const d = duplicateDemoGameState.host.skillRepertoire.length;

        duplicateDemoGameState.host.skillRepertoire[d - 1] = "SA-02";

        duplicateDemoGameState.host.skillRepertoire[d - 2] = "06-01";
        duplicateDemoGameState.host.skillRepertoire[d - 3] = "06-03";
        duplicateDemoGameState.host.skillRepertoire[d - 4] = "04-04";
        duplicateDemoGameState.host.skillRepertoire[d - 5] = "SB-05";
        duplicateDemoGameState.host.skillRepertoire[d - 6] = "SA-01";
        duplicateDemoGameState.host.skillRepertoire[d - 7] = "SA-03";
        duplicateDemoGameState.host.skillRepertoire[d - 8] = "08-02";
        break;

      case "Learn1.176":
        const e = duplicateDemoGameState.host.skillRepertoire.length;
        duplicateDemoGameState.host.skillRepertoire[e - 3] = "SB-05";
        duplicateDemoGameState.host.skillRepertoire[e - 5] = "SB-04";
        duplicateDemoGameState.host.skillRepertoire[e - 6] = "SC-02";
        duplicateDemoGameState.host.bountyPoints = 10;
        break;

      case "Learn1.183":
        duplicateDemoGameState.tactics = [
          { face: "Advance", limit: 1, stock: 1 },
          { face: "Advance", limit: 1, stock: 1 },
        ];

        duplicateDemoGameState.host.avelhemRepertoire[17] = 2;
        duplicateDemoGameState.host.avelhemRepertoire[16] = 2;
        break;

      case "Learn1.188":
        duplicateDemoGameState.currentResolution.pop();
        break;

      case "Learn1.198":
        const f = duplicateDemoGameState.host.skillRepertoire.length;
        duplicateDemoGameState.host.skillRepertoire[f - 6] = "06-01";
        duplicateDemoGameState.host.skillRepertoire[f - 1] = "04-03";
        break;

      case "Learn1.204":
        const g = duplicateDemoGameState.host.skillRepertoire.length;
        duplicateDemoGameState.host.skillRepertoire[g - 1] = "02-04";
        duplicateDemoGameState.host.skillRepertoire[g - 2] = "07-04";
        duplicateDemoGameState.host.skillRepertoire[g - 3] = "02-01";
        duplicateDemoGameState.host.skillRepertoire[g - 4] = "02-02";
        duplicateDemoGameState.host.skillRepertoire[g - 5] = "SA-05";
        duplicateDemoGameState.host.skillRepertoire[g - 6] = "05-04";
        break;

      case "Learn1.216.1":
        duplicateDemoGameState.currentResolution.pop();
        break;

      case "Learn1.249":
        duplicateDemoGameState.currentResolution.pop();
        break;

      case "Learn1.250":
        duplicateDemoGameState.tactics = [
          { face: "Mobilize", limit: 3, stock: 3 },
          { face: "Advance", limit: 1, stock: 1 },
        ];
        break;

      case "Learn1.269":
        duplicateDemoGameState.host.units[3] = {
          player: "host",
          unitIndex: 3,
          row: 1,
          column: 3,
          unitClass: "Pawn",
          hp: 1,
          aether: 1,
          afflictions: {},
          enhancements: {},
          boosts: {},
          temporary: {},
        };

        break;

      //////////////////////
    }

    setDemoGameState(duplicateDemoGameState);
  };

  return (
    <>
      {demoGameState && (
        <div
          className={`demo-body ${demoGuide ? "demoBlocker" : ""}`}
          style={{
            backgroundImage: `url(${getBannerImage("Heir")})`,
          }}
        >
          <div className="demo-header">
            {demoTitle}{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="question-icon2"
              style={{ pointerEvents: "all", fill: "goldenrod" }}
              onClick={() => setInfoPopUp(id)}
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
            </svg>
          </div>

          <div className="demo-board">
            <BoardArea
              userRole={currentPlayer}
              demo={true}
              demoGame={id === "game"}
              gameState={demoGameState}
              setDemoGameState={setDemoGameState}
              demoInstructions={true}
              getDemoInstructions={getDemoInstructions}
              demoNextRevealed={demoNextRevealed}
              handleUpdateDemoGuide={handleUpdateDemoGuide}
              canClick={canClick}
              changeCurrentPlayer={changeCurrentPlayer}
            />
          </div>

          {infoPopUp && (
            <InfoPopUp
              info={infoPopUp}
              setInfoPopUp={setInfoPopUp}
              mobile={true}
            />
          )}

          {/* display demoGuide for debugging */}

          {/* {demoGuide && <h1>{demoGuide}</h1>} */}
        </div>
      )}
    </>
  );
}
