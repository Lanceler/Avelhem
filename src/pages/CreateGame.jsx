import React, { useState, useEffect } from "react";

import "./CreateGame.css";

import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

import { db } from "../config/firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

import { useGetImages } from "../hooks/useGetImages";
import CreateGameImg from "../assets/others/CreateGame.png";

export default function MyGames() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const { getBannerImage } = useGetImages();
  const [bannerIndex, setBannerIndex] = useState(0);

  const bannerImages = [
    getBannerImage("Fire"),
    getBannerImage("Water"),
    getBannerImage("Wind"),
    getBannerImage("Land"),
    getBannerImage("Lightning"),
    getBannerImage("Mana"),
    getBannerImage("Metal"),
    getBannerImage("Plant"),
    // getBannerImage("Sovereign"),
  ];

  const bannerImages2 = [getBannerImage("Avian")];

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 4500);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [bannerImages.length]);

  const onCreateGame = async (expansion) => {
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
          skillRepertoire: null,
          skillVestige: [],
          skillShattered: [],
          skillHand: [],
          skillFloat: 0,
          avelhemRepertoire: [],
          avelhemVestige: [],
          avelhemHand: [],
          avelhemFloat: 0,
          units: [],
          bountyPoints: 0,
          bountyUpgrades: {
            victory: 0,
            frontier: 0,
            acquisition: 0,
            coordination: 0,
            tactics: 0,
            avelhem: 0,
            burst: 0,
          },
          fateDefiance: 3,
          score: 0,
        };

        const createdGamesRef = collection(db, "gameInfo");
        const gameRef = await addDoc(createdGamesRef, {
          date: createTime,
          expansion: expansion,
          version: "0.0.1",
          hostId: user.uid,
          hostName: user.displayName,
          guestId: null,
          guestName: null,
          gameState: {
            // eventLog: [],
            expansion: expansion,
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
    <div
      className="create-game-body"
      style={{
        backgroundImage: `url(${getBannerImage("FireBG")})`,
      }}
    >
      <div className="create-game-header">
        <img src={CreateGameImg} className="page-title" />
      </div>
      <div className="create-game-content">
        <div
          className="create-game-elemental"
          style={{
            backgroundImage: `url(${bannerImages[bannerIndex]})`,
          }}
          onClick={() => onCreateGame("Elemental Entree")}
        >
          <div className="create-game-fadingbanners">
            {bannerImages.map((url, z) => (
              <img
                key={url}
                src={url}
                className="banner-slide"
                style={{ zIndex: z, opacity: `${z === bannerIndex ? 1 : 0}` }}
              />
            ))}
          </div>

          <div className="create-game-banner-text">
            <div className="create-game-title">
              <>ELEMENTAL </>
              <br className="create-game-line-break" />
              <>ENTRÉE</>
            </div>
            <div className="create-game-desc">
              <strong>Base Set Featuring:</strong> <br />
              Fire, Water, Wind, Land, Lightning, Mana, Metal, & Plant
            </div>
          </div>
        </div>

        <div
          className="create-game-elemental"
          style={{
            backgroundImage: `url(${[getBannerImage("Avian")]})`,
            filter: "grayscale(0.9)",
          }}
          // onClick={() => onCreateGame("Familiars’ Followup")}
        >
          <div className="create-game-fadingbanners">
            {bannerImages2.map((url, z) => (
              <img
                key={url}
                src={url}
                className="banner-slide"
                style={{ zIndex: z, opacity: `${z === bannerIndex ? 1 : 0}` }}
              />
            ))}
          </div>

          <div className="create-game-banner-text">
            <div className="create-game-title">
              {/* <>FAMILIARS’ </>
              <br />
              <>FOLLOWUP</> */}
              <>COMING </>
              <br className="create-game-line-break" />
              <>SOON</>
            </div>
            <div className="create-game-desc">
              <strong>Expansion Including:</strong> <br />
              Avian (& more to be added)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
