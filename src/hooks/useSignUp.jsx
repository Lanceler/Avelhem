import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import { db, auth } from "../config/firebaseConfig";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection } from "firebase/firestore";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signUp = async (email, password, displayName) => {
    setError(null);

    displayName = displayName.trim();

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(res.user, { displayName: displayName });

      await dispatch({ type: "LOGIN", payload: res.user });
    } catch (err) {
      setError(err.message);
    }
  };

  return { error, signUp };
};
