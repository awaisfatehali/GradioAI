// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/user";
import { assignmentReducer } from "./reducer/assignment";
import { classReducer } from "./reducer/class";

const Store = configureStore({
  reducer: {
    user: userReducer,
    assignments: assignmentReducer,
    classesdata:classReducer,
  },
});

export default Store;
