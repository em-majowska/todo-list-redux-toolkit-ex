import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
type TInitialState = {
  theme: "light" | "dark";
};

const initialState: TInitialState = {
  theme: "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    switch_theme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export default themeSlice.reducer;
export const themeSliceSelector = (store: RootState) => store.themeSlice;
export const { switch_theme } = themeSlice.actions;
