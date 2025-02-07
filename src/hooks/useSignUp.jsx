import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import { db, auth } from "../config/firebaseConfig";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const starterSkillRepertoire = [
    "01-01", //1. Ignition Propulsion
    "01-01", //2. Ignition Propulsion
    "01-01", //3. Ignition Propulsion
    "01-01", //4. Ignition Propulsion
    "01-02", //5. Conflagration
    "01-02", //6. Conflagration
    "01-02", //7. Conflagration
    "01-02", //8. Conflagration
    "01-04", //9. Resplendence
    "02-01", //10. Purification
    "02-01", //11. Purification
    "02-01", //12. Purification
    "02-01", //13. Purification
    "02-02", //14. Frigid Breath
    "02-02", //15. Frigid Breath
    "02-02", //16. Frigid Breath
    "02-02", //17. Frigid Breath
    "02-03", //18. Healing Rain
    "02-03", //19. Healing Rain
    "02-04", //20. Glacial Torrent
    "03-01", //21. Aerial Impetus
    "03-01", //22. Aerial Impetus
    "03-01", //23. Aerial Impetus
    "03-02", //24. Gale Conjuration
    "03-02", //25. Gale Conjuration
    "03-02", //26. Gale Conjuration
    "03-03", //27. Symphonic Screech
    "03-03", //28. Symphonic Screech
    "03-04", //29. Cataclysmic Tempest
    "04-01", //30. Crystallization
    "04-01", //31. Crystallization
    "04-01", //32. Crystallization
    "04-01", //33. Crystallization
    "04-03", //34. Pitfall Trap
    "04-03", //35. Pitfall Trap
    "04-04", //36. Geomancy
    "07-01", //37. Magnetic Shockwave
    "07-01", //38. Magnetic Shockwave
    "07-01", //39. Magnetic Shockwave
    "07-02", //40. Reinforce
    "07-02", //41. Reinforce
    "07-02", //42. Reinforce
    "07-03", //43. Frenzy Blade
    "07-03", //44. Frenzy Blade
    "07-03", //45. Frenzy Blade
    "07-04", //46. Arsenal Onslaught
    "SA-02", //47. Tea For Two
    "SA-02", //48. Tea For Two
    "SA-03", //49. Dark Halo
    "SA-03", //50. Dark Halo
    "SA-04", //51. Reminiscence
    "SA-04", //52. Reminiscence
    "SB-01", //53. Transmute
    "SB-01", //54. Transmute
    "SB-02", //55. Ambidexterity
    "SB-02", //56. Ambidexterity
    "SB-03", //57. Providence
    "SB-03", //58. Providence
    "SB-05", //59. Press The Attack
    "SB-05", //60. Press The Attack
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
          repertoire2: [
            {
              name: "Starter Repertoire 4",
              skillRepertoire: starterSkillRepertoire,
              avelhemRepertoire: starterAvelhemRepertoire,
              description: "The default repertoire assigned to new accounts.",
            },
            {
              name: "Starter Repertoire 5",
              skillRepertoire: starterSkillRepertoire,
              avelhemRepertoire: starterAvelhemRepertoire,
              description: "The default repertoire assigned to new accounts.",
            },
            {
              name: "Starter Repertoire 6",
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
