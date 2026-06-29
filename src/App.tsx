import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./features/hooks";
import { fetch_list, todosSelector } from "./features/tasks/tasksSlice";
import { TbSunMoon } from "react-icons/tb";
import { switch_theme, themeSliceSelector } from "./features/theme/themeSlice";
import ToDoForm from "./components/ToDoForm";
import TodoList from "./components/TodoList";

function App() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(themeSliceSelector);
  const { taskList, isLoading, error } = useAppSelector(todosSelector);

  useEffect(() => {
    const root = document.querySelector("#root");

    if (theme === "dark") {
      root?.classList.add("dark");
    } else {
      root?.classList.remove("dark");
    }

    dispatch(fetch_list());
  }, [theme, dispatch]);

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
        <ToDoForm />
        {isLoading && <p>Loading ...</p>}
        {error && <p>{error}</p>}
        {taskList && <TodoList />}
      </section>
    </div>
  );
}

export default App;
