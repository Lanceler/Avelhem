import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import { db, auth } from "../config/firebaseConfig";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const starterSkillRepertoire = [
    //Ignition Propulsiom
    "1-1",
    "1-1",
    "1-1",
    "1-1",
    //Conflagration
    "1-2",
    "1-2",
    "1-2",
    "1-2",
    //Blaze of Glory
    "1-3",
    "1-3",
    "1-3",
    //Resplendence
    "1-4",
    //Purification
    "2-1",
    "2-1",
    "2-1",
    "2-1",
    //Crystallization
    "4-1",
    "4-1",
    "4-1",
    "4-1",
    //Upheaval
    "4-2",
    "4-2",
    "4-2",
    "4-2",
    //Pitfall Trap
    "4-3",
    "4-3",
    "4-3",
    //Geomancy
    "4-4",
    //Surge
    "6-1",
    "6-1",
    "6-1",
    "6-1",
    //Diffusion
    "6-2",
    "6-2",
    "6-2",
    "6-2",
    //Aegis
    "6-3",
    "6-3",
    "6-3",
    "6-3",
    //Disruption Field
    "6-4",
    //Arsenal Onslaught
    "7-4",
    //Heir's Endeavor
    "SA-1",
    "SA-1",
    //Tea For Two
    "SA-2",
    "SA-2",
    //Dark Halo
    "SA-4",
    "SA-4",
    //Reminiscence
    "SA-5",
    "SA-5",
    //Transmute
    "SB-1",
    "SB-1",
    //Ambidexterity
    "SB-2",
    "SB-2",
    //Fervent Prayer
    "SB-4",
    "SB-4",
    //Press The Attack
    "SB-5",
    "SB-5",
    //Power At The Final Hour
    "SC-1",
    "SC-1",
  ];

  const starterAvelhemRepertoire = [
    //Fire
    1, 1, 1, 1,
    //Water
    2, 2, 2, 2,
    //Wind
    3, 3, 3, 3,
    //Land
    4, 4, 4, 4,
    //Lightning
    5, 5, 5,
    //Mana
    6, 6, 6, 6,
    //Metal
    7, 7, 7, 7,
    //Plant
    8, 8, 8,
  ];

  const signUp = async (email, password, displayName) => {
    setError(null);

    displayName = displayName.trim();

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(res.user, { displayName: displayName });

      const usersCollectionRef = collection(db, "userInfo");

      const userRef = await addDoc(usersCollectionRef, {
        userId: res.user.uid,
      });

      const userDoc = doc(db, "userInfo", userRef.id);

      await updateDoc(userDoc, {
        id: userRef.id,
        displayName: res.user.displayName,
        repertoire: [
          {
            name: "Starter Repertoire",
            skillRepertoire: starterSkillRepertoire,
            avelhemRepertoire: starterAvelhemRepertoire,
          },
        ],
      });

      await dispatch({ type: "LOGIN", payload: res.user });
    } catch (err) {
      setError(err.message);
    }
  };

  return { error, signUp };
};
