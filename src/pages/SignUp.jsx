import "./SignUp.css";

import { useState, useEffect } from "react";
import { useSignUp } from "../hooks/useSignUp";

export default function SignUp() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const { error, signUp } = useSignUp();

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(email, password, displayName);
  };

  return (
    <div>
      <h3>Sign up</h3>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>
          <span>Email:</span>
          <input
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>

        <label>
          <span>Display name:</span>
          <input
            required
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>

        <button className="btn">sign up</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
