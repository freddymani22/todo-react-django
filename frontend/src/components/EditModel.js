import { useState } from "react";
import axios from "axios"; // Make sure to import axios
import { useTasks } from "./TaskContext";

function EditModel({ editModel, setEditModel, item }) {
  const [updateTask, setUpdateTask] = useState(item.task);
  const [updateduration, setUpdateDuration] = useState(item.duration);

  const { setIsLoading, dateSelect, setTasks } = useTasks();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  function handleModelClose() {
    setEditModel((showModel) => !showModel);
  }

  function handleForm(e) {
    e.preventDefault();
    setIsLoading(true);
    setEditModel((showModel) => !showModel);
    const url = `${BASE_URL}task-update/${item.id}/`;
    const data = { task: updateTask, duration: updateduration };
    const token = localStorage.getItem("token");

    async function updateData() {
      try {
        await fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });

        const response = await axios.get(
          `${BASE_URL}${dateSelect[0]}/${dateSelect[1]}/${dateSelect[2]}/`,
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

    updateData(); // Call updateData once after defining it
  }

  return (
    <>
      <div className={`model ${editModel ? "" : "hidden"}`}>
        <p className="model__title">UPDATE TO-DO</p>
        <button className={"model-close"} onClick={handleModelClose}>
          &times;
        </button>
        <form className="model__form">
          <input
            className="input"
            type="text"
            value={updateTask}
            onChange={(e) => setUpdateTask(e.target.value)}
            placeholder="TASK"
          />
          <input
            placeholder="DURATION"
            className="input"
            type="number"
            value={updateduration}
            onChange={(e) => setUpdateDuration(e.target.value)}
          />
          <button
            className="btn model__form-btn"
            onClick={(e) => handleForm(e)}
          >
            SAVE
          </button>
        </form>
      </div>
      <div className={`overlay ${editModel ? "" : "hidden"}`}></div>
    </>
  );
}

export default EditModel;
