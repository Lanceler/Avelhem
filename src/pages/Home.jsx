import { useAuthContext } from "../hooks/useAuthContext";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useAuthContext();

  return (
    <>
      <div className="abilityText">Hello, {user.displayName}</div>
      <br />
      <div className="abilityText">
        This page (and the website in general) is under construction.
      </div>
      <div className="abilityText">
        To get started with a game, click on "Create Game" in the navigation bar
        above.
      </div>
      <div className="abilityText">
        You may also view your repertoires by clicking on "Repertoires".
      </div>
    </>
  );
}
