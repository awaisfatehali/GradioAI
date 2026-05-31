import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  classes: [],  // stores all classes
  isValid: false,
};

export const classReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("GetClassesRequest", (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase("GetClassesSuccess", (state, action) => {
      state.loading = false;
      state.classes = action.payload;
      state.isValid = true;
    })
    .addCase("GetClassesFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isValid = false;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
