import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseURL from "../../../utils/baseURL";
import axios from "axios";

// Create Product initial state
const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//TODO: Image upload

// Create product action
export const createProductAction = createAsyncThunk(
  "product/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const {
        name,
        category,
        sizes,
        colors,
        price,
        totalQty,
        brand,
        description,
      } = payload;

      // Authentication using token
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.post(
        `${baseURL}/products`,
        {
          name,
          category,
          sizes,
          colors,
          price,
          totalQty,
          brand,
          description,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createProductAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.isAdded = true;
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(createProductAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isAdded = false;
      state.product = null;
    });
  },
});
// Generate reducers
const productReducer = productSlice.reducer;
export default productReducer;
