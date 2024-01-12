import axios from "axios";
import { useEffect, useState, useRef } from "react";

import Authenticate from "./Authenticate";
import Content from "./Content";
import Loading from "../Loading";

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

      <main className="main">
        <div className="header">
          <h1>ToDos!</h1>
        </div>
        <div className="container">
          {isLoading ? (
            <Loading />
          ) : isAuthenticated ? (
            <Content
              setDateSelect={setDateSelect}
              dateSelect={dateSelect}
              setIsAuthenticated={setIsAuthenticated}
              message={message}
              setMessage={setMessage}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              nextDateClickCountRef={nextDateClickCountRef}
              previousDateClickCountRef={previousDateClickCountRef}
            />
          ) : (
            <Authenticate setIsAuthenticated={setIsAuthenticated} />
          )}
        </div>
      </main>
    </>
  );
}

export default Main;
