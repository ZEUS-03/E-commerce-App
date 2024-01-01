import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

const initialState = {
  color: {},
  colors: [],
  error: null,
  loading: false,
  isAdded: false,
  isDeleted: false,
};

// Create color action
export const createColorAction = createAsyncThunk(
  "color/create",
  async ({ name }, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const res = await axios.post(`${baseURL}/color`, { name }, config);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.res?.data);
    }
  }
);

// fetch all color action
export const getAllColorAction = createAsyncThunk(
  "color/getAll",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const res = await axios.get(`${baseURL}/color`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.res?.data);
    }
  }
);

const colorSlice = createSlice({
  name: "colors",
  initialState,
  extraReducers: (builder) => {
    // Add color
    builder.addCase(createColorAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.color = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createColorAction.rejected, (state, action) => {
      state.loading = false;
      state.color = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    // Get all colors
    builder.addCase(getAllColorAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.colors = action.payload;
    });
    builder.addCase(getAllColorAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.colors = null;
    });
  },
});

const colorReducer = colorSlice.reducer;
export default colorReducer;
