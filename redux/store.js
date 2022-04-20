import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import todoReducer from "./slices/todoSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
  },
});
