import axios from "axios";
import { useEffect, useState } from "react";

import Authenticate from "./Authenticate";
import Content from "./Content";
import Loading from "../Loading";

function Main() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState([]);
  const [dateSelect, setDateSelect] = useState(getTodayDate);
  const [isToday, setIsToday] = useState(true);

  function getTodayDate() {
    const dateToday = new Date();
    const year = dateToday.getFullYear();
    const month = dateToday.getMonth() + 1;
    const day = dateToday.getDate();
    return [year, month, day];
  }

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      let response;
      try {
        response = await axios.get(
          `http://localhost:8000/api/${dateSelect[0]}/${dateSelect[1]}/${dateSelect[2]}/`,
          {
            headers,
          }
        );
        if (response.status === 200) {
          setMessage(response.data);
          setIsAuthenticated(true);
        }
        // Handle successful response
      } catch (error) {
      } finally {
      }
    }
    fetchData();
  }, [setMessage, isAuthenticated, dateSelect]);
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
          {isAuthenticated ? (
            isLoading ? (
              <Loading />
            ) : (
              <Content
                setIsToday={setIsToday}
                isToday={isToday}
                setDateSelect={setDateSelect}
                dateSelect={dateSelect}
                setIsAuthenticated={setIsAuthenticated}
                message={message}
                setMessage={setMessage}
              />
            )
          ) : (
            <Authenticate setIsAuthenticated={setIsAuthenticated} />
          )}
        </div>
      </main>
    </>
  );
}

export default Main;
