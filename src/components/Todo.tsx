import { delete_task, toggle_task } from "../features/tasks/tasksSlice";
import { useAppDispatch } from "../features/hooks";
// import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { RiDeleteBin5Fill } from "react-icons/ri";
import type { TTask } from "../types";

type TProps = {
  task: TTask;
};

const Todo = ({ task }: TProps) => {
  const dispatch = useAppDispatch();

  return (
    <article className="flex gap-4 items-center border-b-2 p-2">
      {/* <button onClick={() => dispatch(toggle_task(task._id))}>
        {task.isDone ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
      </button> */}
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={() => dispatch(toggle_task(task._id))}
      />
      <p className={`text-lg ${task.isDone && "line-through"}`}>{task.title}</p>
      <button
        onClick={() => dispatch(delete_task(task._id))}
        className="bg-red-500 p-2 rounded ms-auto hover:cursor-pointer">
        <RiDeleteBin5Fill className="text-2xl text-white " />
      </button>
    </article>
  );
};

export default Todo;
