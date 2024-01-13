import "./App.css";
import Main from "./components/Main";
import { TaskContext } from "./components/TaskContext";

function App() {
  return (
    <TaskContext>
      <Main />
    </TaskContext>
  );
}

export default App;
