import axios from "axios";
import { useState } from "react";

import SignUp from "./SignUp";

export default function Authenticate({ setIsAuthenticated }) {
  const [isSignUp, setIsSignUp] = useState(true);

  function handleAuthToggle() {
    setIsSignUp((isSignIn) => !isSignIn);
  }

  return (
    <div className="authenticate">
      <div className="authenticate__toggle-container">
        <button
          to="signup"
          onClick={handleAuthToggle}
          className={`authenticate__toggle authenticate__toggle--login pointer ${
            isSignUp ? "authenticate__toggle_off" : ""
          }`}
        >
          SIGN-IN
        </button>
        <button
          onClick={handleAuthToggle}
          className={`authenticate__toggle authenticate__toggle--login ${
            !isSignUp ? "authenticate__toggle_off" : ""
          }`}
        >
          SIGN-UP
        </button>
      </div>
      <div className="authenticate__input-container">
        {isSignUp ? (
          <SignIn setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <SignUp setIsSignUp={setIsSignUp} />
        )}
      </div>
    </div>
  );
}

function SignIn({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFocusUsername, setIsFocusUsername] = useState(false);
  const [isFocusPassword, setIsFocusPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  function handleLoginDetails() {
    async function loginData() {
      try {
        setIsLoading(true);
        const res = await axios.post(`${BASE_URL}login/`, {
          username,
          password,
        });
        const token = res.data.access_token;
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
      } catch (e) {
        console.log(e);
        setError(e.response.data);
      } finally {
        setIsLoading(false);
      }
    }
    loginData();
  }
  return (
    <>
      <div className="authenticate__input-username">
        <label
          htmlFor="username"
          className={`input__label ${
            isFocusUsername ? "input__label--visible" : "input__label"
          }`}
        >
          Username{" "}
        </label>
        <input
          type="text"
          className="input"
          id="username"
          placeholder={isFocusUsername ? "" : "USERNAME"}
          value={username}
          onFocus={() => setIsFocusUsername(true)}
          onBlur={() => setIsFocusUsername(false)}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="authenticate__input-password ">
        <label
          htmlFor="password"
          className={`input__label ${
            isFocusPassword ? "input__label--visible" : "input__label"
          }`}
        >
          Password
        </label>
        <input
          type="password"
          value={password}
          id="password"
          className="input"
          placeholder={isFocusPassword ? "" : "PASSWORD"}
          onFocus={() => setIsFocusPassword(true)}
          onBlur={() => setIsFocusPassword(false)}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="authenticate__error">{error.detail}</p>}
      </div>

      <button className="btn btn__authenticate" onClick={handleLoginDetails}>
        {isLoading ? <div className="auth-loading"></div> : "LOGIN"}
      </button>
      <button className="authenticate__forgot-password">
        Forgot Password?
      </button>
    </>
  );
}
