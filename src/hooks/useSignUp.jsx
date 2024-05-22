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
    "01-01", //1
    "01-01", //2
    "01-01", //3
    "01-01", //4
    //Conflagration
    "01-02", //5
    "01-02", //6
    "01-02", //7
    "01-02", //8
    //Blaze of Glory
    "01-03", //9
    "01-03", //10
    "01-03", //11
    //Resplendence
    "01-04", //12
    //Purification
    "02-01", //13
    "02-01", //14
    "02-01", //15
    "02-01", //16
    //Frigid Breath
    "02-02", //17
    "02-02", //18
    "02-02", //19
    "02-02", //20
    //Healing Rain
    "02-03", //21
    "02-03", //22
    //Glacial Torrent
    "02-04", //25
    //Crystallization
    "04-01", //26
    "04-01", //27
    "04-01", //28
    "04-01", //29
    //Pitfall Trap
    "04-03", //30
    "04-03", //31
    "04-03", //32
    "04-03", //33
    //Geomancy
    "04-04", //34
    //Magnetic Shockwwave
    "07-01", //35
    "07-01", //36
    "07-01", //37
    "07-01", //38
    //Reinforce
    "07-02", //39
    "07-02", //40
    "07-02", //41
    "07-02", //42
    //Frenzy Blade
    "07-03", //43
    "07-03", //44
    "07-03", //45
    "07-03", //46
    //Arsenal Onslaught
    "07-04", //47
    //Tea For Two
    "SA-02", //48
    "SA-02", //49
    //Dark Halo
    "SA-03", //50
    "SA-03", //51
    //Reminiscence
    "SA-04", //52
    "SA-04", //53
    //Transmute
    "SB-01", //54
    "SB-01", //55
    //Providence
    "SB-03", //56
    "SB-03", //57
    //Fervent Prayer
    "SB-04", //58
    "SB-04", //59
    //Press the Attack
    "SB-05", //21
    "SB-05", //22
    //Cataclysmic Tempest
    "03-04", //60
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
    //Metal
    7, 7, 7, 7,
  ];

  const signUp = async (email, password, password2, displayName) => {
    setError(null);

    if (password !== password2) {
      setError("Passwords do not match.");
    } else {
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
              name: "Starter Repertoire 1",
              skillRepertoire: starterSkillRepertoire,
              avelhemRepertoire: starterAvelhemRepertoire,
              description: "The default repertoire assigned to new accounts.",
            },
            {
              name: "Starter Repertoire 2",
              skillRepertoire: starterSkillRepertoire,
              avelhemRepertoire: starterAvelhemRepertoire,
              description: "The default repertoire assigned to new accounts.",
            },
            {
              name: "Starter Repertoire 3",
              skillRepertoire: starterSkillRepertoire,
              avelhemRepertoire: starterAvelhemRepertoire,
              description: "The default repertoire assigned to new accounts.",
            },
          ],
        });

        await dispatch({ type: "LOGIN", payload: res.user });
      } catch (err) {
        switch (err.message) {
          case "Firebase: Error (auth/network-request-failed).":
            setError("Connection error. Please try again.");
            break;
          case "Firebase: Error (auth/email-already-in-use).":
            setError("Email already in use.");
            break;
          case "Firebase: Password should be at least 6 characters (auth/weak-password).":
            setError("Password must contain at least 6 characters.");
            break;
          default:
            setError(err.message);
            break;
        }
      }
    }
  };

  return { error, signUp };
};
