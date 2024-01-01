import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

const initialState = {
  brand: {},
  brands: [],
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
  loading: false,
};

// create brand action

export const createBrandAction = createAsyncThunk(
  "brand/create",
  async ({ name }, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(`${baseURL}/brand`, { name }, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Get brands action
export const getBrandAction = createAsyncThunk(
  "brand/getAll",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/brand`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// create slice

const brandSlice = createSlice({
  name: "brand",
  initialState,
  extraReducers: (builder) => {
    // create brand
    builder.addCase(createBrandAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
      state.brand = action.payload;
    });
    builder.addCase(createBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.isAdded = false;
      state.error = action.payload;
      state.brand = null;
    });
    // get brands
    builder.addCase(getBrandAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brands = action.payload;
    });
    builder.addCase(getBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.brands = null;
    });
  },
});

const brandReducer = brandSlice.reducer;
export default brandReducer;
