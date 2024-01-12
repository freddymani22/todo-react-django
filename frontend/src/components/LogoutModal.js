import { useContext } from "react";
import TaskProvider from "./TaskContent";

function LogoutModal({ setLogoutModal, logoutModal }) {
  const { setIsAuthenticated } = useContext(TaskProvider);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setLogoutModal(false);
  }

  function handleModelClose() {
    setLogoutModal(false);
  }
  return (
    <>
      <div className={`model message ${logoutModal ? "" : "hidden"}`}>
        <button className={"model-close"} onClick={handleModelClose}>
          &times;
        </button>
        <p className="message__question">Are you sure?</p>
        <div className="message__btns">
          <button
            className=" btn message__btn__cancel"
            onClick={() => setLogoutModal(false)}
          >
            CANCEL
          </button>
          <button
            className=" btn message__btn__delete"
            onClick={(e) => handleLogout(e)}
          >
            LOGOUT
          </button>
        </div>
      </div>
      <div className={`overlay ${logoutModal ? "" : "hidden"}`}></div>
    </>
  );
}

export default LogoutModal;
