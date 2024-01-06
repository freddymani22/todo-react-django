import axios from "axios";

import { useReducer, useState } from "react";
import SignUpSuccessModal from "./SignUpSuccessModal";

const initialState = {
  username: "",
  email: "",
  password1: "",
  password2: "",
  error: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "username":
      return {
        ...state,
        username: action.payload,
      };
    case "password":
      return {
        ...state,
        password: action.payload,
      };
    case "email":
      return {
        ...state,
        email: action.payload,
      };
    case "password1":
      return {
        ...state,
        password1: action.payload,
      };
    case "password2":
      return {
        ...state,
        password2: action.payload,
      };
    case "error":
      return {
        ...state,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type!");
  }
}

export default function SignUp({ setIsSignUp }) {
  const [{ username, email, password1, password2, error }, dispatch] =
    useReducer(reducer, initialState);
  const [isFocusUsername, setIsFocusUsername] = useState(false);
  const [isFocusEmail, setIsFocusEmail] = useState(false);
  const [isFocusPassword1, setIsFocusPassword1] = useState(false);
  const [isFocusPassword2, setIsFocusPassword2] = useState(false);
  const [isAccCreated, setIsAccCreated] = useState(false);

  const singUpData = { username, email, password1, password2 };

  function handleSignUpdetails(e) {
    e.preventDefault();
    async function postSignUpdata() {
      try {
        const res = await axios.post("http://127.0.0.1:8000/api/", singUpData);
        if (res.statusText === "Created") {
          setIsAccCreated(true);
        }
      } catch (e) {
        dispatch({ type: "error", payload: e.response.data });
      }
    }
    postSignUpdata();
  }
  return (
    <>
      <form className="authenticate">
        <div className="authenticate__input-username">
          <label
            htmlFor="username"
            className={`input__label ${
              isFocusUsername ? "input__label--visible" : "input__label"
            }`}
          >
            Username
          </label>
          <input
            required
            type="text"
            className="input"
            id="username"
            placeholder={isFocusUsername ? "" : "USERNAME"}
            value={username}
            onFocus={() => setIsFocusUsername(true)}
            onBlur={() => setIsFocusUsername(false)}
            onChange={(e) =>
              dispatch({ type: "username", payload: e.target.value })
            }
          />
          {error.username && (
            <p className="authenticate__error">{error.username}</p>
          )}
        </div>
        <div className="authenticate__input-username">
          <label
            htmlFor="email"
            className={`input__label ${
              isFocusEmail ? "input__label--visible" : "input__label"
            }`}
          >
            Email
          </label>
          <input
            required
            type="email"
            className="input"
            id="email"
            placeholder={isFocusEmail ? "" : "EMAIL"}
            onFocus={() => setIsFocusEmail(true)}
            onBlur={() => setIsFocusEmail(false)}
            value={email}
            onChange={(e) =>
              dispatch({ type: "email", payload: e.target.value })
            }
          />
          {error.email && <p className="authenticate__error">{error.email}</p>}
        </div>
        <div className="authenticate__input-password">
          <label
            htmlFor="password"
            className={`input__label ${
              isFocusPassword1 ? "input__label--visible" : "input__label"
            }`}
          >
            Password
          </label>
          <input
            required
            type="password"
            id="password"
            className="input"
            placeholder={isFocusPassword1 ? "" : "PASSWORD"}
            onFocus={() => setIsFocusPassword1(true)}
            onBlur={() => setIsFocusPassword1(false)}
            value={password1}
            onChange={(e) =>
              dispatch({ type: "password1", payload: e.target.value })
            }
          />
          {error.non_field_errors && (
            <div className="authenticate__error">
              {error.non_field_errors.map((errorMessage, index) => (
                <p key={index}>
                  {errorMessage
                    .split(".")
                    .map((sentence, sentenceIndex, sentencesArray) => (
                      <span key={sentenceIndex}>
                        {sentence}
                        {sentenceIndex < sentencesArray.length - 1 && "."}
                        {sentenceIndex < sentencesArray.length - 1 && <br />}
                      </span>
                    ))}
                </p>
              ))}
            </div>
          )}
        </div>
        <div className="authenticate__input-password">
          <label
            htmlFor="reEnterPassword"
            className={`input__label ${
              isFocusPassword2 ? "input__label--visible" : "input__label"
            }`}
          >
            CONFIRM PASSWORD
          </label>
          <input
            required
            type="password"
            id="reEnterPassword"
            className="input"
            placeholder={isFocusPassword2 ? "" : "CONFIRM PASSWORD"}
            onFocus={() => setIsFocusPassword2(true)}
            onBlur={() => setIsFocusPassword2(false)}
            value={password2}
            onChange={(e) =>
              dispatch({ type: "password2", payload: e.target.value })
            }
          />
          {error.non_field_errors && (
            <p className="authenticate__error">{error.non_field_errors[1]}</p>
          )}
        </div>
        <button
          className="btn btn__authenticate"
          onClick={(e) => handleSignUpdetails(e)}
        >
          SIGNUP
        </button>
      </form>
      <SignUpSuccessModal
        isAccCreated={isAccCreated}
        setIsSignUp={setIsSignUp}
        setIsAccCreated={setIsAccCreated}
      />
    </>
  );
}
