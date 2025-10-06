import { configureStore } from "@reduxjs/toolkit";
import colorThemeReducer from "./reducer/colorThemeSlice";

export const store = configureStore({
  reducer: {
    colorThemes: colorThemeReducer,
  },
});
