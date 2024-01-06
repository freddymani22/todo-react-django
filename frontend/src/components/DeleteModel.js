import axios from "axios";

function DeleteModel({
  SetShowDeleteModel,
  showDeleteModel,
  id,
  setMessage,
  dateSelect,
}) {
  function handleDelete() {
    SetShowDeleteModel((showMessage) => !showMessage);

    const BASE_URL = "http://127.0.0.1:8000/api/";
    const token = localStorage.getItem("token");

    async function deleteData() {
      try {
        const res = await fetch(`${BASE_URL}task-delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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
          setMessage(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
    deleteData();
  }

  function handleModelClose() {
    SetShowDeleteModel((showMessage) => !showMessage);
  }

  return (
    <>
      <div className={`model message ${showDeleteModel ? "" : "hidden"}`}>
        <button className={"model-close"} onClick={handleModelClose}>
          &times;
        </button>
        <p className="message__question">Are you sure?</p>
        <div className="message__btns">
          <button
            className=" btn message__btn__cancel"
            onClick={() => SetShowDeleteModel(false)}
          >
            CANCEL
          </button>
          <button
            className=" btn message__btn__delete"
            onClick={(e) => handleDelete(e)}
          >
            DELETE
          </button>
        </div>
      </div>
      <div className={`overlay ${showDeleteModel ? "" : "hidden"}`}></div>
    </>
  );
}

export default DeleteModel;
