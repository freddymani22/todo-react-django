function ContentHeader({ handleAddToDoBtn }) {
  return (
    <div className="content__header">
      <p className="content__header__text">TASK LISTS</p>
      <button className="add-icon pointer" onClick={handleAddToDoBtn}>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 32 32"
        >
          <path d="M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z"></path>
        </svg>
      </button>
    </div>
  );
}

export default ContentHeader;
