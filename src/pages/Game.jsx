import { useAuthContext } from "../hooks/useAuthContext";

import { useEffect } from "react";

export default function Game() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useAuthContext();

  return <div>Game</div>;
}
