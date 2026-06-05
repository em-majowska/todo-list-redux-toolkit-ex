import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasks/tasksSlice";
import themeReducer from "./theme/themeSlice";

export const store = configureStore({
  reducer: {
    tasksSlice: tasksReducer,
    themeSlice: themeReducer,
  },
});

// types
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
