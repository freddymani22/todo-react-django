import { createContext, useContext, useRef, useState } from "react";

const TaskProvider = createContext();

function TaskContext({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState([]);
  const [dateSelect, setDateSelect] = useState(getTodayDate);

  const nextDateClickCountRef = useRef(0);
  const previousDateClickCountRef = useRef(0);

  function getTodayDate() {
    const dateToday = new Date();
    const year = dateToday.getFullYear();
    const month = dateToday.getMonth() + 1;
    const day = dateToday.getDate();
    return [year, month, day];
  }

  return (
    <TaskProvider.Provider
      value={{
        setDateSelect,
        dateSelect,
        setIsAuthenticated,
        isAuthenticated,
        tasks: message,
        setTasks: setMessage,
        isLoading,
        setIsLoading,
        nextDateClickCounter: nextDateClickCountRef,
        previousDateClickCounter: previousDateClickCountRef,
      }}
    >
      {children}
    </TaskProvider.Provider>
  );
}

function useTasks() {
  const taskContext = useContext(TaskProvider);
  return taskContext;
}

export { TaskContext, useTasks };
