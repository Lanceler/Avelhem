import "./LogIn.css";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { useSignUp } from "../hooks/useSignUp";

export default function SignUp() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [displayName, setDisplayName] = useState("");

  const { error, signUp } = useSignUp();

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(email, password, password2, displayName);
  };

  return (
    // <div>
    //   <h3>Sign up</h3>
    //   <form onSubmit={handleSubmit} className="signup-form">
    //     <label>
    //       <span>Email:</span>
    //       <input
    //         required
    //         type="email"
    //         onChange={(e) => setEmail(e.target.value)}
    //         value={email}
    //       />
    //     </label>
    //     <label>
    //       <span>Password:</span>
    //       <input
    //         required
    //         type="password"
    //         onChange={(e) => setPassword(e.target.value)}
    //         value={password}
    //       />
    //     </label>

    //     <label>
    //       <span>Display name:</span>
    //       <input
    //         required
    //         type="text"
    //         onChange={(e) => setDisplayName(e.target.value)}
    //         value={displayName}
    //       />
    //     </label>

    //     <button className="btn">sign up</button>
    //     {error && <p>{error}</p>}
    //   </form>
    // </div>

    <div className="login-body">
      <div className="login-box signup">
        <form onSubmit={handleSubmit}>
          <h2>Sign up</h2>
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
          <div className="login-input">
            <input
              required
              type="password"
              onChange={(e) => setPassword2(e.target.value)}
              value={password2}
            />
            <span>Confirm password</span>
            <i></i>
          </div>
          <div className="login-input">
            <input
              required
              type="text"
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
            />
            <span>Display name</span>
            <i></i>
          </div>

          <div className="login-links">
            <Link to="/login">Already have an account? Log in here.</Link>
          </div>
          <input type="submit" value="Submit"></input>
          {error && <span className="login-error">{error}</span>}
        </form>
      </div>
    </div>
  );
}
