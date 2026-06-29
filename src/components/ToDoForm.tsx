import { useRef } from "react";
import { useAppDispatch } from "../features/hooks";
import { create_task } from "../features/tasks/tasksSlice";

const ToDoForm = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (inputRef.current) {
          dispatch(create_task(inputRef.current.value));
          inputRef.current.value = "";
        }
      }}>
      <input
        type="text"
        name="task"
        id="task"
        ref={inputRef}
        className="border-amber-50 border h-10"
      />
      <button className="counter">Add</button>
    </form>
  );
};

export default ToDoForm;
