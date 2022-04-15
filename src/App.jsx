import { useState } from "react";
import Todo from "./components/Todo";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [listView, setListView] = useState("all");

  const activeView = "text-blue-700 cursor-pointer";

  function handleChange(event) {
    setTask(event.target.value);
  }

  function todoComoponent() {
    return (
      <Todo
        task={task}
        isDone={() => isDone(task.id)}
        remove={() => remove(task.id)}
        key={task.id}
      />
    );
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      const newTask = { id: uuidv4(), task, completed: false };
      task && setTasks((prev) => [...prev, newTask]);
      setTask("");
    }
  }

  function isDone(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function remove(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function clearCompleted() {
    setTasks(tasks.filter((task) => !task.completed));
  }

  return (
    <>
      <div className="mt-2 flex flex-col justify-center items-center">
        <h2 className="text-2xl text-slate-700">TODO APP</h2>
        <input
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={task}
          className="border-2 border-blue-700 text-zinc-900 p-2"
          placeholder="Create a new todo ..."
        />
      </div>
      {listView === "all" &&
        tasks.map((task) => (
          <Todo
            task={task}
            isDone={() => isDone(task.id)}
            remove={() => remove(task.id)}
            key={task.id}
          />
        ))}
      {listView === "active" &&
        tasks
          .filter((task) => !task.completed)
          .map((task) => (
            <Todo
              task={task}
              isDone={() => isDone(task.id)}
              remove={() => remove(task.id)}
              key={task.id}
            />
          ))}
      {listView === "completed" &&
        tasks
          .filter((task) => task.completed)
          .map((task) => (
            <Todo
              task={task}
              isDone={() => isDone(task.id)}
              remove={() => remove(task.id)}
              key={task.id}
            />
          ))}

      <div className="mt-2 flex justify-center items-center gap-3">
        <span className="text-green-700">{`${
          tasks.filter((task) => !task.completed).length
        } Items left`}</span>

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

        <span onClick={clearCompleted} className="text-red-500 cursor-pointer">
          Clear Completed
        </span>
      </div>
    </>
  );
}

export default App;
