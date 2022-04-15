import { useState } from "react";
import DoneIcon from "../Assets/circle-check-solid.svg";
import RemoveIcon from "../Assets/circle-minus-solid.svg";

export default function Todo(props) {
  const style = "w-7 fill-blue-500 cursor-pointer";

  return (
    <div className="mt-3 flex justify-center items-center gap-2 ">
      <img onClick={props.isDone} className={style} src={DoneIcon} alt="Done" />
      <h2
        className={props.task.completed ? "line-through text-blue-500" : null}
      >
        {props.task.task}
      </h2>
      <img
        onClick={props.remove}
        className={style}
        src={RemoveIcon}
        alt="Remove"
      />
    </div>
  );
}
