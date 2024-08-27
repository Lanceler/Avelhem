import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import { useGetImages } from "../hooks/useGetImages";

import "./Rules.css";

export default function Rules() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useAuthContext();
  const { getBannerImage } = useGetImages();

  return (
    <div className="rule-body">
      <div
        className="rule-content"
        style={{
          backgroundImage: `url(${getBannerImage("WindBG")})`,
        }}
      >
        <div className="rule-title">RULES</div>

        <div className="rules-text">
          <h2>Overview</h2>
          <p>
            <em>Avelhem: War of the Sovereigns</em> is a board game set in a
            fantastical realm where two players assume the roles of Sovereigns
            commanding armies on a grid-based battlefield. The objective is to
            maneuver a unit to the opponent’s end of the board.
          </p>
          <br />
          <p>
            Sovereigns alternate taking turns consisting of multiple phases.
            Each turn provides up to two tactics that can be expended to perform
            various actions such as drawing a card and moving a unit. Sovereigns
            can accumulate cards over the course of multiple turns and activate
            them at opportune moments to supplement their limited actions.
          </p>
          <br />
          <p>
            Units enter play as pawns capable only of movement and attack. Pawns
            can ascend into Scions, unlocking access to exclusive abilities,
            talents, and skill cards with a variety of effects.
          </p>
          <br />

          <h2>Objective</h2>
          <p>
            A Sovereign wins by moving one of their pieces to the opponent’s end
            of the board. When victory is achieved, the Sovereigns may opt to
            continue playing by raising the number of units required for
            victory.
          </p>
          <br />

          <h2>Components</h2>
          <ol>
            <li>Game board</li>
            <ul>
              <li>Features a grid with 10 rows and 5 columns</li>
            </ul>

            <li>3 custom dice</li>
            <ul>
              <li>
                Faces consist of 2 Advance, 2 Mobilize, 1 Assault, and 1 Invoke
              </li>
            </ul>

            <li>Avelhem and skill cards</li>
            <ul>
              <li>
                The base game provides each Sovereign a playset consisting of 32
                (8 unique) Avelhems and 136 (46 unique) skills
              </li>
            </ul>

            <li>Unit tokens</li>
            <ul>
              <li>
                The base game provides 2 sets (1 gold and 1 silver) of 8 pawns
                and 16 (8 unique) Scion tokens
              </li>
            </ul>

            <li>Player boards</li>
            <ul>
              <li>
                Displays a catalogue of upgrades and contains numbered tracks
                tallying Bounty Points and Fate Defiances
              </li>
            </ul>

            <li>Miscellaneous tokens</li>
            <ul>
              <li>Tracks and represents units’ attributes and statuses</li>
              <li>
                (The digital simulator does not use these tokens; rather, it
                utilizes various visual assets)
              </li>
            </ul>
          </ol>
        </div>
      </div>
    </div>
  );
}
