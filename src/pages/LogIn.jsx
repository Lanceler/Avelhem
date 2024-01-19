import "./LogIn.css";

import { useState, useEffect } from "react";
import { useLogIn } from "../hooks/useLogin";

export default function LogIn() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, logIn } = useLogIn();

  const handleSubmit = (e) => {
    e.preventDefault();
    logIn(email, password);
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit} className="login-form">
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

        <button className="btn">Log in</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
