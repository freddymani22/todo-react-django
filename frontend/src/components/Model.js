import { useState } from "react";
import axios from "axios"; // Make sure to import axios
function Model({ setMessage, showModel, setShowModel, dateSelect }) {
  const [task, setTask] = useState("");
  const [duration, setDuration] = useState("");

  const BASE_URL = "http://127.0.0.1:8000/api";

  function handleModelClose() {
    setShowModel((showModel) => !showModel);
  }

  function handleForm(e) {
    e.preventDefault();
    setShowModel((showModel) => !showModel);
    const url = `${BASE_URL}/task-create/`;
    const data = { task: task, duration: duration };
    const token = localStorage.getItem("token");
    async function postData() {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        const response = await axios.get(
          `http://localhost:8000/api/${dateSelect[0]}/${dateSelect[1]}/${dateSelect[2]}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setMessage(response.data);
        }
      } catch {
        console.log("error");
      }
    }
    postData();
    setDuration("");
    setTask("");
  }
  return (
    <>
      <div className={`model ${showModel ? "" : "hidden"}`}>
        <p className="model__title">ADD TO-DO</p>
        <button className={"model-close"} onClick={handleModelClose}>
          &times;
        </button>
        <form className="model__form">
          <input
            className="input"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="TASK"
          />
          <input
            placeholder="DURATION"
            className="input"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <button
            className="btn model__form-btn"
            onClick={(e) => handleForm(e)}
          >
            ADD TASK
          </button>
        </form>
      </div>
      <div className={`overlay ${showModel ? "" : "hidden"}`}></div>
    </>
  );
}

export default Model;
