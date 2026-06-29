import {
  // createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
// import axios from "axios";
import type { RootState } from "../store";
import { v4 as uuidv4 } from "uuid";
import type { TTask } from "../../types";

type TInitialState = {
  isLoading: boolean;
  error: string | null;
  taskList: TTask[];
};

const initialState: TInitialState = {
  isLoading: true,
  error: null,
  taskList: [],
};

// export const fetch_data = createAsyncThunk("tasks/fetch_data", async () => {
//   const { data } = await axios.get<TTask[]>("http://localhost:3000/tasks");
//   return data;
// });

// export const create_task = createAsyncThunk(
//   "tasks/create_task",
//   async (task: TTask) => {
//     const { data } = await axios.post<TTask>(
//       "http://localhost:3000/tasks",
//       task,
//     );

//     return data;
//   },
// );

// export const delete_task = createAsyncThunk(
//   "tasks/delete_task",
//   async (id: string) => {
//     const { data } = await axios.delete(`http://localhost:3000/tasks/${id}`);
//     return data;
//   },
// );

// export const toggle_task = createAsyncThunk(
//   "tasks/toggle_task",
//   async (id: string) => {
//     const { data } = await axios.put(
//       `http://localhost:3000/tasks/toggle/` + id,
//     );
//     return data;
//   },
// );

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    create_task: (state, action: PayloadAction<string>) => {
      state.taskList.push({
        _id: uuidv4(),
        title: action.payload,
        isDone: false,
      });
    },
    delete_task: (state, action: PayloadAction<string>) => {
      state.taskList = state.taskList.filter(
        (task) => task._id !== action.payload,
      );
    },
    toggle_task: (state, action: PayloadAction<string>) => {
      // const task = state.taskList.find((t) => t._id === action.payload);
      // if (task) task.isDone = !task.isDone;
      state.taskList = state.taskList.map((t) => {
        if (t._id === action.payload) {
          return { ...t, isDone: !t.isDone };
        } else {
          return t;
        }
      });
    },
  },
  // extraReducers: (builder) => {
  //   // Fetch tasks
  //   builder.addCase(fetch_data.fulfilled, (state, action) => {
  //     state.taskList = action.payload;
  //     state.isLoading = false;
  //   });
  //   builder.addCase(fetch_data.pending, (state) => {
  //     state.isLoading = true;
  //     state.error = null;
  //   });
  //   builder.addCase(fetch_data.rejected, (state, action) => {
  //     state.error = action.error.message || "Error occured";
  //     state.isLoading = false;
  //   });

  //   // Create task
  //   builder.addCase(create_task.fulfilled, (state, action) => {
  //     state.taskList.push(action.payload);
  //     state.isLoading = false;
  //   });
  //   builder.addCase(create_task.pending, (state) => {
  //     state.isLoading = true;
  //     state.error = null;
  //   });
  //   builder.addCase(create_task.rejected, (state, action) => {
  //     state.error = action.error.message || "Error occured";
  //     state.isLoading = false;
  //   });

  //   // Delete task

  //   builder.addCase(delete_task.fulfilled, (state, action) => {
  //     state.taskList = state.taskList.filter(
  //       (t) => t._id !== action.payload._id,
  //     );
  //     state.isLoading = false;
  //   });
  //   builder.addCase(delete_task.pending, (state) => {
  //     state.isLoading = true;
  //     state.error = null;
  //   });
  //   builder.addCase(delete_task.rejected, (state, action) => {
  //     state.error = action.error.message || "Error occured";
  //     state.isLoading = false;
  //   });

  //   // Toggle task

  //   builder.addCase(toggle_task.fulfilled, (state, action) => {
  //     const task = state.taskList.find((t) => t._id === action.payload?._id);
  //     if (task) task.isDone = !task.isDone;
  //     state.isLoading = false;
  //   });
  //   builder.addCase(toggle_task.pending, (state) => {
  //     state.isLoading = true;
  //     state.error = null;
  //   });
  //   builder.addCase(toggle_task.rejected, (state, action) => {
  //     state.error = action.error.message || "Error occured";
  //     state.isLoading = false;
  //   });
  // },
});

export default tasksSlice.reducer;
export const { create_task, delete_task, toggle_task } = tasksSlice.actions;
export const tasksSliceSelector = (store: RootState) => store.tasksSlice;
export const todosSelector = (store: RootState) => store.tasksSlice.taskList;
