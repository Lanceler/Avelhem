import { useAuthContext } from "../hooks/useAuthContext";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useAuthContext();

  return <div>Home</div>;
}
