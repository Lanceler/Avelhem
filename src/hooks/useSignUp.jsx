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
    "01-01",
    "01-01",
    "01-01",
    "01-01",
    //Conflagration
    "01-02",
    "01-02",
    "01-02",
    "01-02",
    //Blaze of Glory
    "01-03",
    "01-03",
    "01-03",
    //Resplendence
    "01-04",
    //Purification
    "02-01",
    "02-01",
    "02-01",
    "02-01",
    //Crystallization
    "04-01",
    "04-01",
    "04-01",
    "04-01",
    //Upheaval
    "04-02",
    "04-02",
    "04-02",
    "04-02",
    //Pitfall Trap
    "04-03",
    "04-03",
    "04-03",
    //Geomancy
    "04-04",
    //Surge
    "06-01",
    "06-01",
    "06-01",
    "06-01",
    //Diffusion
    "06-02",
    "06-02",
    "06-02",
    "06-02",
    //Aegis
    "06-03",
    "06-03",
    "06-03",
    "06-03",
    //Disruption Field
    "06-04",
    //Arsenal Onslaught
    "07-04",
    //Heir's Endeavor
    "SA-01",
    "SA-01",
    //Tea For Two
    "SA-02",
    "SA-02",
    //Dark Halo
    "SA-04",
    "SA-04",
    //Reminiscence
    "SA-05",
    "SA-05",
    //Transmute
    "SB-01",
    "SB-01",
    //Ambidexterity
    "SB-02",
    "SB-02",
    //Fervent Prayer
    "SB-04",
    "SB-04",
    //Press The Attack
    "SB-05",
    "SB-05",
    //Power At The Final Hour
    "SC-01",
    "SC-01",
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
