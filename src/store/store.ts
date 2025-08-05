import { configureStore } from "@reduxjs/toolkit";
import dishReducer from "./dishSlice";
import commentsReducer from "./commentsSlice";

const store = configureStore({
  reducer: {
    dish: dishReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
