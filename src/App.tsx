import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./features/hooks";
import {
  create_task,
  delete_task,
  fetch_data,
  tasksSliceSelector,
  toggle_task,
  type TTask,
} from "./features/tasks/tasksSlice";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { TbSunMoon } from "react-icons/tb";
import { switch_theme, themeSliceSelector } from "./features/theme/themeSlice";

function App() {
  const [input, setInput] = useState("");

  const dispatch = useAppDispatch();
  const theme = useAppSelector(themeSliceSelector);
  const { taskList, isLoading, error } = useAppSelector(tasksSliceSelector);

  useEffect(() => {
    const root = document.querySelector("#root");

    if (theme.theme === "dark") {
      root?.classList.add("dark");
    } else {
      root?.classList.remove("dark");
    }

    dispatch(fetch_data());
  }, [theme.theme, dispatch]);

  return (
    <div className="min-h-screen bg-orange-200 text-black dark:bg-amber-950 dark:text-white">
      <header className="p-4">
        <TbSunMoon
          onClick={() => dispatch(switch_theme())}
          className="text-3xl hover:cursor-pointer"
        />
      </header>
      <section className="flex items-center justify-center flex-col gap-5">
        <div>
          <h1 className="text-5xl">Todo List</h1>
        </div>
        <p>Add thing to do</p>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(create_task({ title: input }));
            setInput("");
          }}>
          <input
            type="text"
            name="task"
            id="task"
            className="border-amber-50 border h-10"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="counter" onClick={() => {}}>
            Add
          </button>
        </form>
        {isLoading && <p>Loading ...</p>}
        {error && <p>{error}</p>}
        {taskList && (
          <div className="flex flex-col gap-2 w-120">
            {taskList.map((task: TTask) => {
              return (
                <article
                  key={task._id}
                  className="flex gap-4 items-center border-b-2 p-2">
                  <button onClick={() => dispatch(toggle_task(task._id!))}>
                    {task.isDone ? (
                      <ImCheckboxChecked />
                    ) : (
                      <ImCheckboxUnchecked />
                    )}
                  </button>
                  <p className={`text-lg ${task.isDone && "line-through"}`}>
                    {task.title}
                  </p>
                  <button
                    onClick={() => dispatch(delete_task(task._id!))}
                    className="bg-red-500 p-2 rounded ms-auto hover:cursor-pointer">
                    <RiDeleteBin5Fill className="text-2xl text-white " />
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
