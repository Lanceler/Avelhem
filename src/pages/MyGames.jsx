import React, { useState, useEffect } from "react";

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

export default function MyGames() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const onCreateGame = async () => {
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
          avelhemRepertoire: [],
          avelhemVestige: [],
          avelhemHand: [],
          units: [],
          bountyPoints: 0,
          bountyUpgrades: {
            victory: 0,
            frontier: 0,
            acquisition: 0,
            coordination: 0,
            tactics: 0,
            avelhem: 0,
          },
          fateDefiances: 3,
          score: 0,
        };

        const createdGamesRef = collection(db, "gameInfo");
        const gameRef = await addDoc(createdGamesRef, {
          date: createTime,
          hostId: user.uid,
          hostName: user.displayName,
          guestId: null,
          guestName: null,
          gameState: {
            turnCount: 0,
            turnPlayer: null,
            turnPhase: null,
            tactics: [],
            currentResolution: [],
            eventLog: [],
            zones: zones,

            host: playerData,

            guest: playerData,
            winner: null,
          },
        });

        console.log(gameRef.id);

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
    <>
      <div>MyGames</div>
      <button onClick={() => onCreateGame()}>Create Game</button>
    </>
  );
}
