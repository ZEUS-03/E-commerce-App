import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/usersSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export default store;
