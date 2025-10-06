import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useGetImages } from "../hooks/useGetImages";
import { useCardDatabase } from "../hooks/useCardDatabase";

import { db } from "../config/firebaseConfig";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

import "./Home.css";

import HomeImg from "../assets/others/Home.png";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useAuthContext();
  const { getBannerImage } = useGetImages();

  const { starterAvelhemRepertoire, starterSkillRepertoire } =
    useCardDatabase();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreateTeaGame = async () => {
    if (!isLoading) {
      setIsLoading(true);

      try {
        let createTime = new Date();
        const dateConversion = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        };
        createTime = createTime.toLocaleString("en-US", dateConversion);

        let zones = [];

        for (let r = 0; r < 10; r++) {
          zones.push([]);
          for (let c = 0; c < 5; c++) {
            zones[r][c] = { id: r * 5 + c, row: r, column: c };
          }
        }

        zones = JSON.stringify(zones);

        const playerData = {
          skillRepertoire: starterSkillRepertoire,
          skillVestige: [],
          skillHand: [],
          skillFloat: 0,
          avelhemRepertoire: starterAvelhemRepertoire,
          avelhemVestige: [],
          avelhemHand: [],
          avelhemFloat: 0,
          units: [],
          bountyPoints: 5,
          bountyUpgrades: {
            frontier: 0,
            acquisition: 0,
            coordination: 0,
            tactics: 0,
            avelhem: 0,
            skill: 0,
          },
          defiancePoints: 3,
          score: 0,
        };

        const createdGamesRef = collection(db, "gameInfo");
        const gameRef = await addDoc(createdGamesRef, {
          date: createTime,
          version: "0.0.1",
          teaTrial: true,
          expansion: "Tea Trial",
          hostId: user.uid,
          hostName: user.displayName,
          guestId: null,
          guestName: null,
          gameState: {
            teaTrial: true,
            // eventLog: [],
            activatingSkill: [],
            activatingTarget: [],
            activatingUnit: [],
            activatingResonator: [],
            currentResolution: [],
            turnCount: 0,
            turnPlayer: null,
            turnPhase: null,
            tactics: [],
            zones: zones,
            host: playerData,
            guest: playerData,
            winObjective: 1,
            winner: null,
          },
        });

        const gameDoc = doc(db, "gameInfo", gameRef.id);

        await updateDoc(gameDoc, { id: gameRef.id });
        setIsLoading(false);
        navigate(`/game?g=${gameRef.id}`);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="home-body">
      <div
        className="home-content"
        style={{
          backgroundImage: `url(${getBannerImage("LandBG")})`,
        }}
      >
        <div className="home-title">
          <img src={HomeImg} className="page-title" />
        </div>

        <div
          className="home-banner"
          style={{ backgroundImage: `url(${getBannerImage("Foreshadow")})` }}
        >
          <div className="home-banner-backdrop">
            <div className="home-banner-title">LEARN TO PLAY</div>
            <div className="home-banner-text-body">
              <div className="home-banner-text">
                <Link to="/demo/learn-overview">
                  <button className="home-banner-button">
                    Interactive Tutorial
                  </button>
                </Link>
              </div>
              <div className="home-banner-text">
                <Link
                  to="/rules"
                  // to="/"
                >
                  <button className="home-banner-button">Rules</button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className="home-banner"
          style={{
            // backgroundImage: `url(${getBannerImage("Challenge")})`
            backgroundImage: `url(${getBannerImage("MatchMade")})`,
          }}
        >
          <div className="home-banner-backdrop">
            <div className="home-banner-title">ENTER THE FRAY</div>
            <div className="home-banner-text-body">
              <div className="home-banner-text">
                {!user ? (
                  <Link to="/login">
                    <button className="home-banner-button">Log In</button>
                  </Link>
                ) : (
                  <Link to="/create-game">
                    <button className="home-banner-button">Host A Game</button>
                  </Link>
                )}
              </div>
              <div className="home-banner-text">
                {!user ? (
                  <Link to="/SignUp">
                    <button className="home-banner-button">
                      Create Account
                    </button>
                  </Link>
                ) : (
                  <Link to="/repertoires">
                    <button className="home-banner-button">
                      View Repertoires
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {user && (
          <div
            className="home-banner"
            style={{ backgroundImage: `url(${getBannerImage("Tea")})` }}
          >
            <div className="home-banner-backdrop">
              <div className="home-banner-title">TRIAL OVER TEA</div>
              <div className="home-banner-text-body">
                <div className="home-banner-text">
                  <button
                    className="home-banner-button"
                    onClick={() => handleCreateTeaGame()}
                  >
                    Play A Light Trial
                    <br /> With A Friend
                  </button>
                </div>
                <div className="home-banner-text">
                  <Link to="/rules/trial-over-tea">
                    <button className="home-banner-button">Rules</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
