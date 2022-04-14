import { useState } from "react";
import Todo from "./components/Todo";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function handleChange(event) {
    setTask((prev) => event.target.value);
  }

  function handelClick() {
    task && setTasks((prev) => [...prev, task]);
    setTask((prev) => "");
  }

  function remove(task, index) {
    const newArray = [];

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i] !== task && i !== index) {
        newArray.push(tasks[i]);
      }
    }

    setTasks((prev) => newArray);
  }

  return (
    <>
      <div className="mt-2 flex justify-center items-center gap-2 ">
        <input
          onChange={handleChange}
          value={task}
          className="border-2 border-blue-700"
        ></input>
        <button
          onClick={handelClick}
          className="p-1 rounded-md text-xs text-slate-300 bg-violet-700"
        >
          Add Items
        </button>
      </div>
      {tasks.map((task, index) => (
        <Todo task={task} remove={() => remove(task, index)} key={index} />
      ))}
    </>
  );
}

export default App;
