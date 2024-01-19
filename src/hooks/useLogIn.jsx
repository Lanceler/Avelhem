import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogIn = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const logIn = async (email, password) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password).then((res) => {
        dispatch({ type: "LOGIN", payload: res.user });
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return { error, logIn };
};
