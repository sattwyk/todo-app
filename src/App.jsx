import { useState } from "react";
import Todo from "./components/Todo";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [listView, setListView] = useState("all");

  const activeView = "text-blue-700 cursor-pointer";

  function handleChange(event) {
    setTask((prev) => event.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      const newTask = { task, completed: false };
      task && setTasks((prev) => [...prev, newTask]);
      setTask((prev) => "");
    }
  }

  function isDone(task, index) {
    const newArray = [];

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].task === task && i === index) {
        newArray.push({ task: tasks[i].task, completed: !tasks[i].completed });
      } else {
        newArray.push(tasks[i]);
      }
    }

    setTasks(newArray);
  }

  function remove(task, index) {
    const newArray = [];

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].task !== task && i !== index) {
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
          onKeyPress={handleKeyPress}
          value={task}
          className="border-2 border-blue-700 text-zinc-900"
        />
      </div>
      {listView === "all" &&
        tasks.map((task, index) => (
          <Todo
            task={task}
            isDone={() => isDone(task.task, index)}
            remove={() => remove(task.task, index)}
            key={index}
          />
        ))}
      {listView === "active" &&
        tasks
          .filter((task) => !task.completed)
          .map((task, index) => (
            <Todo
              task={task}
              isDone={() => isDone(task.task, index)}
              remove={() => remove(task.task, index)}
              key={index}
            />
          ))}
      {listView === "completed" &&
        tasks
          .filter((task) => task.completed)
          .map((task, index) => (
            <Todo
              task={task}
              isDone={() => isDone(task.task, index)}
              remove={() => remove(task.task, index)}
              key={index}
            />
          ))}

      <div className="mt-2 flex justify-center items-center gap-2">
        <span>{`Item left: ${
          tasks.filter((task) => !task.completed).length
        }`}</span>

        <span
          className={listView === "all" ? activeView : "cursor-pointer"}
          onClick={() => setListView((prev) => "all")}
        >
          All
        </span>
        <span
          className={listView === "active" ? activeView : "cursor-pointer"}
          onClick={() => setListView((prev) => "active")}
        >
          Active
        </span>
        <span
          className={listView === "completed" ? activeView : "cursor-pointer"}
          onClick={() => setListView((prev) => "completed")}
        >
          Completed
        </span>
      </div>
    </>
  );
}

export default App;
