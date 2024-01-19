import { useAuthContext } from "./useAuthContext";

import { auth } from "../config/firebaseConfig";
import { signOut } from "firebase/auth";

export const useLogOut = () => {
  const { dispatch } = useAuthContext();

  const logOut = () => {
    const logoutConfirmation = window.confirm("Do you want to logout?");

    if (logoutConfirmation) {
      signOut(auth)
        .then(() => {
          dispatch({ type: "LOGOUT" });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return { logOut };
};
