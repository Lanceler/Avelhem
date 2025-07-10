import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import { db, auth } from "../config/firebaseConfig";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

import { useCardDatabase } from "./useCardDatabase";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const { starterAvelhemRepertoire, starterSkillRepertoire } =
    useCardDatabase();

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
              description: "The default repertoire provided to new accounts.",
            },
            {
              name: "Starter Repertoire 2",
              skillRepertoire: starterSkillRepertoire,
              avelhemRepertoire: starterAvelhemRepertoire,
              description: "The default repertoire provided to new accounts.",
            },
            {
              name: "Starter Repertoire 3",
              skillRepertoire: starterSkillRepertoire,
              avelhemRepertoire: starterAvelhemRepertoire,
              description: "The default repertoire provided to new accounts.",
            },
          ],
          repertoire2: [
            {
              name: "Starter Repertoire 4",
              skillRepertoire: starterSkillRepertoire,
              avelhemRepertoire: starterAvelhemRepertoire,
              description: "The default repertoire provided to new accounts.",
            },
            {
              name: "Starter Repertoire 5",
              skillRepertoire: starterSkillRepertoire,
              avelhemRepertoire: starterAvelhemRepertoire,
              description: "The default repertoire provided to new accounts.",
            },
            {
              name: "Starter Repertoire 6",
              skillRepertoire: starterSkillRepertoire,
              avelhemRepertoire: starterAvelhemRepertoire,
              description: "The default repertoire provided to new accounts.",
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
