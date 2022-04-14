import { useState } from "react";
import DoneIcon from "../Assets/circle-check-solid.svg";
import RemoveIcon from "../Assets/circle-minus-solid.svg";

export default function Todo(props) {
  const [isDone, setIsDone] = useState(false);

  function handleClick() {
    setIsDone((prev) => !prev);
  }

  return (
    <div className="mt-3 flex justify-center items-center gap-2 ">
      <img
        onClick={handleClick}
        className="w-7 fill-blue-500"
        src={DoneIcon}
        alt="Done"
      />
      <h2 className={isDone ? "line-through" : null}>{props.task}</h2>
      <img
        onClick={props.remove}
        className="w-7 fill-blue-500"
        src={RemoveIcon}
        alt="Remove"
      />
    </div>
  );
}
