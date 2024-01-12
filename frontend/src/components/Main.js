import axios from "axios";
import { useEffect, useState, useRef } from "react";

import Authenticate from "./Authenticate";
import Content from "./Content";
import Loading from "../Loading";
import TaskProvider from "./TaskContent";

function Main() {
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

  // Access the environment variable
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      let response;
      try {
        response = await axios.get(
          `${BASE_URL}${dateSelect[0]}/${dateSelect[1]}/${dateSelect[2]}/`,
          {
            headers,
          }
        );
        if (response.status === 200) {
          setMessage(response.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [setMessage, isAuthenticated, dateSelect, BASE_URL]);
  return (
    <>
      {/* {!isAuthenticated && (
        <section className="hero">
          <h1>There are still so many things</h1>
          <h1>left to do!!</h1>
        </section>
      )} */}
      <TaskProvider.Provider
        value={{
          setDateSelect,
          dateSelect,
          setIsAuthenticated,
          tasks: message,
          setTasks: setMessage,
          isLoading,
          setIsLoading,
          nextDateClickCounter: nextDateClickCountRef,
          previousDateClickCounter: previousDateClickCountRef,
        }}
      >
        <main className="main">
          <div className="header">
            <h1>ToDos!</h1>
          </div>
          <div className="container">
            {isLoading ? (
              <Loading />
            ) : isAuthenticated ? (
              <Content />
            ) : (
              <Authenticate />
            )}
          </div>
        </main>
      </TaskProvider.Provider>
      ;
    </>
  );
}

export default Main;
