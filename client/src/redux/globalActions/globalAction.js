import { createAsyncThunk } from "@reduxjs/toolkit";

export const errorReseter = createAsyncThunk("resetErr", () => {
  return {};
});

export const successReseter = createAsyncThunk("resetSuccess", () => {
  return {};
});
