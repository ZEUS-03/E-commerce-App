import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import baseURL from "../../utils/baseURL";
import { errorReseter } from "../globalActions/globalAction";

// Initial State

const initialState = {
  loading: false,
  error: null,
  users: [],
  user: {},
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    userInfo: {},
  },
};

// Registration action
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (
    { fullname, email, password },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const { data } = await axios.post(`${baseURL}/users/register`, {
        fullname,
        email,
        password,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Login action

export const loginUserAction = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(`${baseURL}/users/login`, {
        email,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// User slice
const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    // Login reducers
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.userAuth.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.userAuth.loading = false;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userAuth.error = action.payload;
      state.userAuth.loading = false;
    });
    // Register reducers
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    // Error resetter
    builder.addCase(errorReseter.pending, (state) => {
      state.error = null;
    });
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
