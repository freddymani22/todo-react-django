import axios from "axios";
import { useEffect } from "react";

import Authenticate from "./Authenticate";
import Content from "./Content";
import Loading from "../Loading";
import { useTasks } from "./TaskContext";

function Main() {
  const {
    setIsLoading,
    dateSelect,
    setTasks,
    setIsAuthenticated,
    isAuthenticated,
    isLoading,
  } = useTasks();

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
          setTasks(response.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [
    setTasks,
    isAuthenticated,
    dateSelect,
    setIsAuthenticated,
    setIsLoading,
    BASE_URL,
  ]);
  return (
    <>
      {/* {!isAuthenticated && (
        <section className="hero">
          <h1>There are still so many things</h1>
          <h1>left to do!!</h1>
        </section>
      )} */}
      <main className="main">
        <header className="header">
          <h1>ToDos!</h1>
        </header>

        <section className="container">
          {isLoading ? (
            <Loading />
          ) : isAuthenticated ? (
            <Content />
          ) : (
            <Authenticate />
          )}
        </section>
      </main>
      ;
    </>
  );
}

export default Main;
