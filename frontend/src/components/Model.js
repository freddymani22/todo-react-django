import { useState } from "react";
import axios from "axios"; // Make sure to import axios
import { useTasks } from "./TaskContext";

function Model({ showModel, setShowModel }) {
  const { dateSelect, setIsLoading, setTasks } = useTasks();

  const [task, setTask] = useState("");
  const [duration, setDuration] = useState("");
  const [time, setTime] = useState("");

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  function handleModelClose() {
    setShowModel((showModel) => !showModel);
  }

  function handleForm(e) {
    const dateArray = dateSelect.join("-");
    e.preventDefault();
    setIsLoading(true);
    setShowModel((showModel) => !showModel);
    const url = `${BASE_URL}task-create/`;
    const data = { task: task, duration: duration, timestamp: dateArray };
    const token = localStorage.getItem("token");
    async function postData() {
      try {
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });

        const response = await axios.get(
          `${BASE_URL}/${dateSelect[0]}/${dateSelect[1]}/${dateSelect[2]}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setTasks(response.data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
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
          <input
            placeholder="DURATION"
            className="input"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <button
            className="btn model__form-btn"
            onClick={(e) => handleForm(e)}
          >
            ADD
          </button>
        </form>
      </div>
      <div className={`overlay ${showModel ? "" : "hidden"}`}></div>
    </>
  );
}

export default Model;
