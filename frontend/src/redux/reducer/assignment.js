// src/redux/reducer/assignment.js
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  allData: [],   // VERY IMPORTANT
  isValid: false,
};

export const assignmentReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("GetGradRequest", (state) => {
      state.loading = true;
      state.error = null;
    })

    .addCase("GetGradSuccess", (state, action) => {
      state.loading = false;
      state.allData = action.payload;
      state.isValid = true;
    })

    .addCase("GetGradFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isValid = false;
    })

    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
