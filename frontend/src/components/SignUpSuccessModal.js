function SignUpSuccessModal({ isAccCreated, setIsSignUp, setIsAccCreated }) {
  function handleSuccessModal() {
    setIsSignUp((val) => !val);
    setIsAccCreated(false);
  }

  return (
    <>
      <div className={`model message ${isAccCreated ? "" : "hidden"}`}>
        {/* <button className={"model-close"} onClick={handleSuccessModal}>
          &times;
        </button> */}
        <p className="message__question">SIGN UP SUCCESSFULL!</p>
        {/* <button
            className=" btn message__btn__cancel"
            onClick={() => setLogoutModal(false)}
          >
            CANCEL
          </button> */}
        <button className="message__sign-in btn" onClick={handleSuccessModal}>
          SIGN IN NOW!
        </button>
      </div>
      <div className={`overlay ${isAccCreated ? "" : "hidden"}`}></div>
    </>
  );
}

export default SignUpSuccessModal;
