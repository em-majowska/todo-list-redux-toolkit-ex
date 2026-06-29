import { useAppSelector } from "../features/hooks";
import { todosSelector } from "../features/tasks/tasksSlice";
import type { TTask } from "../types";
import Todo from "./Todo";

const TodoList = () => {
  const taskList = useAppSelector(todosSelector);
  return (
    <div className="flex flex-col gap-2 w-120">
      {taskList.map((task: TTask) => {
        return <Todo key={task._id} task={task} />;
      })}
    </div>
  );
};

export default TodoList;
