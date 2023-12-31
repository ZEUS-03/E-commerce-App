import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseURL from "../../../utils/baseURL";
import axios from "axios";

// Create category initial state
const initialState = {
  categories: [],
  category: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

// Create category action
export const createCategoryAction = createAsyncThunk(
  "category/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name } = payload;

      // Authentication using token
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(
        `${baseURL}/category`,
        {
          name,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Get all categories
export const getCategoriesAction = createAsyncThunk(
  "category/get All",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/category`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.isAdded = true;
      state.loading = false;
      state.category = action.payload;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isAdded = false;
      state.category = null;
    });

    // Fetch all categories
    builder.addCase(getCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCategoriesAction.fulfilled, (state, action) => {
      state.isAdded = true;
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(getCategoriesAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isAdded = false;
      state.categories = null;
    });
  },
});
// Generate reducers
const categoryReducer = categorySlice.reducer;
export default categoryReducer;
