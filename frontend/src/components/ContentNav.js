import { useRef } from "react";

function ContentNav({ dateSelect, setDateSelect, setIsToday, isToday }) {
  const nextDateClickCountRef = useRef(0);
  const previousDateClickCountRef = useRef(0);

  function handleDateSelect(nextOrPrev) {
    const currentDate = new Date();
    const clickedDate = new Date(currentDate);
    if (nextOrPrev === "previous") {
      previousDateClickCountRef.current++;
      clickedDate.setDate(
        currentDate.getDate() -
          previousDateClickCountRef.current +
          nextDateClickCountRef.current
      );
    } else if (nextOrPrev === "next") {
      nextDateClickCountRef.current++;
      clickedDate.setDate(
        currentDate.getDate() +
          nextDateClickCountRef.current -
          previousDateClickCountRef.current
      );
      const isSameDate =
        clickedDate.toDateString() === currentDate.toDateString();
      setIsToday(isSameDate);
    }
    const year = clickedDate.getFullYear();
    const month = clickedDate.getMonth() + 1;
    const day = clickedDate.getDate();
    setDateSelect([year, month, day]);
  }

  return (
    <div className="content__nav">
      <svg
        onClick={() => handleDateSelect("previous")}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <title>chevron-left</title>
        <path d="M19.923 7.226c0.714 0.698 0.77 1.669 0 2.522l-5.995 6.253 5.995 6.253c0.77 0.853 0.714 1.826 0 2.518-0.712 0.698-1.915 0.653-2.584 0-0.669-0.65-7.203-7.512-7.203-7.512-0.357-0.347-0.536-0.803-0.536-1.259s0.179-0.912 0.536-1.262c0 0 6.534-6.859 7.203-7.512 0.669-0.654 1.872-0.698 2.584 0z"></path>
      </svg>
      <p className="content__nav__date">{`${dateSelect[2]}-${dateSelect[1]}-${dateSelect[0]}`}</p>
      {
        <svg
          onClick={() => handleDateSelect("next")}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <title>chevron-right</title>
          <path d="M14.661 7.226c0.669 0.653 7.203 7.512 7.203 7.512 0.357 0.35 0.536 0.806 0.536 1.262s-0.179 0.912-0.536 1.259c0 0-6.534 6.862-7.203 7.512-0.669 0.653-1.872 0.698-2.584 0-0.714-0.694-0.77-1.666 0-2.518l5.995-6.253-5.995-6.253c-0.77-0.853-0.714-1.826 0-2.522 0.712-0.698 1.915-0.654 2.584 0z"></path>
        </svg>
      }
    </div>
  );
}

export default ContentNav;
