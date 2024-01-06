import { useState } from "react";
import ContentNav from "./ContentNav";
import ContentHeader from "./ContentHeader";
import Model from "./Model";
import DeleteModel from "./DeleteModel";
import EmptyItem from "./EmptyItem";
import EditModel from "./EditModel";
import LogoutModal from "./LogoutModal";

function Content({
  setIsAuthenticated,
  dateSelect,
  setDateSelect,
  setIsToday,
  isToday,
  message,
  setMessage,
}) {
  const [showModel, setShowModel] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  function handleLogout() {
    setLogoutModal(true);
  }

  function handleAddToDoBtn() {
    setShowModel((showModel) => !showModel);
  }

  return (
    <section className="content">
      <ContentHeader handleAddToDoBtn={handleAddToDoBtn} />
      <ContentNav
        dateSelect={dateSelect}
        setDateSelect={setDateSelect}
        isToday={isToday}
        setIsToday={setIsToday}
      />
      <div className="content__task-list">
        {message.length > 0 ? (
          message
            .slice() // Create a shallow copy to avoid modifying the original array
            .sort((a, b) => a.task.localeCompare(b.task)) // Sort alphabetically based on the 'name' property (replace with the actual property you want to sort by)
            .map((item) => (
              <Task
                item={item}
                key={item.id}
                setMessage={setMessage}
                dateSelect={dateSelect}
              />
            ))
        ) : (
          <EmptyItem />
        )}
      </div>
      <button className=" btn content__btn" onClick={handleLogout}>
        LOGOUT
      </button>
      <Model
        setMessage={setMessage}
        showModel={showModel}
        setShowModel={setShowModel}
        dateSelect={dateSelect}
      />
      <LogoutModal
        setLogoutModal={setLogoutModal}
        setIsAuthenticated={setIsAuthenticated}
        logoutModal={logoutModal}
      />
    </section>
  );
}

export default Content;

function Task({ item, setMessage, dateSelect }) {
  const [showDeleteModel, SetShowDeleteModel] = useState(false);
  const [editModel, setEditModel] = useState(false);

  function handleDelete() {
    SetShowDeleteModel((message) => !message);
  }
  function handleEdit() {
    setEditModel((val) => !val);
  }

  return (
    <div className="task-item">
      <div className="task-item_details">
        <p className="task-item__name">{item.task}</p>
        <p className="task-item__duration">{item.duration} min</p>
      </div>
      <div className="task-item__btn">
        <svg
          className="task-item-delete"
          onClick={handleDelete}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 32 32"
        >
          <title>delete</title>
          <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
          <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
        </svg>
        <svg
          onClick={handleEdit}
          className="task-item-edit"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 32 32"
        >
          <title>edit</title>
          <path d="M30 32h-28c-1.105 0-2-0.895-2-2v-28c0-1.105 0.895-2 2-2h20l-4 4h-14v24h24v-14l4-4v20c0 1.105-0.895 2-2 2zM8 24v-6l18-18h2l4 4v2l-18 18h-6zM17 17l11-11-2-2-11 11 2 2zM12 18l-2 2v2h2l2-2-2-2z"></path>
        </svg>
      </div>
      <EditModel
        editModel={editModel}
        setEditModel={setEditModel}
        setMessage={setMessage}
        item={item}
        dateSelect={dateSelect}
      />
      <DeleteModel
        id={item.id}
        showDeleteModel={showDeleteModel}
        SetShowDeleteModel={SetShowDeleteModel}
        setMessage={setMessage}
        dateSelect={dateSelect}
      />
    </div>
  );
}
