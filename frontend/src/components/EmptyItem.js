import emptyStateImg from "../no-item.svg";

function EmptyItem() {
  return (
    <div className="empty-state">
      <img className="empty-state__img" src={emptyStateImg} alt="empty-list" />
      <p className="empty-state__text">YOUR TASK LIST IS EMPTY</p>
    </div>
  );
}

export default EmptyItem;
