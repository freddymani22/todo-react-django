import axios from "axios";
import { useEffect } from "react";

function UseDataFetch(
  dateSelect,
  setIsAuthenticated,
  isAuthenticated,
  setMessage
) {
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
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
    fetchData();
  }, [isAuthenticated, setMessage, setIsAuthenticated, dateSelect]);
}

export default UseDataFetch;
