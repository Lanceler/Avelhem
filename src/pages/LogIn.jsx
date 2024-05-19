import "./LogIn.css";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { useLogIn } from "../hooks/useLogIn";

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
    <div className="login-body">
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <h2>Log in</h2>
          <div className="login-input">
            <input
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <span>Email</span>
            <i></i>
          </div>
          <div className="login-input">
            <input
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <span>Password</span>
            <i></i>
          </div>
          <div className="login-links">
            <Link to="/signup">No account? Sign up here.</Link>
          </div>
          <input type="submit" value="Submit"></input>
          {error === "Firebase: Error (auth/invalid-credential)." && (
            <span className="login-error">
              Email and password do not match.
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
