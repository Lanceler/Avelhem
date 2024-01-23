import React, { useState } from "react";

import { useAuthContext } from "../hooks/useAuthContext";

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
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();

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

        const createdGamesRef = collection(db, "gameInfo");
        const gameRef = await addDoc(createdGamesRef, {
          date: createTime,
          hostId: user.uid,
          hostName: user.displayName,
          guestId: null,
          guestName: null,
          GameState: {
            turnCount: 0,
            turnPlayer: 0,
            turnPhase: null,
            tactics: null,
            currentResolution: [],
            eventLog: [],
            skillRepertoires: { player1: [], player2: [] },
            skillVestiges: { player1: [], player2: [] },
            skillShattered: { player1: [], player2: [] },
            avelhemRepertoires: { player1: [], player2: [] },
            avelhemVestiges: { player1: [], player2: [] },
            hands: { player1: [], player2: [] },
            bountyPoints: [],
            bountyUpgrades: { player1: [], player2: [] },
            fateDefiances: [],
            score: [],
            winner: null,
          },
        });

        console.log(gameRef.id);

        const gameDoc = doc(db, "gameInfo", gameRef.id);

        await updateDoc(gameDoc, { id: gameRef.id });
        setIsLoading(false);
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
