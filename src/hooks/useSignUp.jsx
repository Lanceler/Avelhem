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
    1, 1, 1, 1,
    //Conflagration
    2, 2, 2, 2,
    //Blaze of Glory
    3, 3, 3,
    //Resplendence
    4,
    //Purification
    5, 5, 5, 5,
    //Crystallization
    13, 13, 13, 13,
    //Upheaval
    14, 14, 14, 14,
    //Pitfall Trap
    15, 15, 15,
    //Geomancy
    16,
    //Surge
    21, 21, 21, 21,
    //Diffusion
    22, 22, 22, 22,
    //Aegis
    23, 23, 23, 23,
    //Disruption Field
    24,
    //Arsenal Onslaught
    28,
    //Heir's Endeavor
    33, 33,
    //Tea For Two
    34, 34,
    //Dark Halo
    36, 36,
    //Reminiscence
    37, 37,
    //Transmute
    39, 39,
    //Ambidexterity
    40, 40,
    //Fervent Prayer
    42, 42,
    //Press The Attack
    43, 43,
    //Power At The Final Hour
    44, 44,
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
