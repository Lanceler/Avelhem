import { useAuthContext } from "../hooks/useAuthContext";

import { useEffect } from "react";

import Board from "../components/Board";

export default function Game() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useAuthContext();

  return (
    <>
      <div>Game</div>
      <div>
        <Board />
      </div>
    </>
  );
}
