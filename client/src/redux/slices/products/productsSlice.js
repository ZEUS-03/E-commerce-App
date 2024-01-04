import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseURL from "../../../utils/baseURL";
import axios from "axios";
import { errorReseter, successReseter } from "../../globalActions/globalAction";

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
        files,
      } = payload;

      // Authentication using token
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      };

      //constructing form data -> Provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the XMLHttpRequest.send() method. It uses the same format a form would use if the encoding type were set to "multipart/form-data".

      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("totalQty", totalQty);
      formData.append("brand", brand);
      formData.append("description", description);

      sizes.forEach((size) => {
        formData.append("sizes", size);
      });
      colors.forEach((color) => {
        formData.append("colors", color);
      });
      files.forEach((file) => {
        formData.append("files", file);
      });
      const { data } = await axios.post(
        `${baseURL}/products`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchAllProductAction = createAsyncThunk(
  "product/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/products`);
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

    builder.addCase(fetchAllProductAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchAllProductAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.products = null;
    });
    // Reset error action
    builder.addCase(errorReseter.pending, (state, action) => {
      state.error = null;
    });
    // Reset success action
    builder.addCase(successReseter.pending, (state, action) => {
      state.isAdded = false;
    });
  },
});
// Generate reducers
const productReducer = productSlice.reducer;
export default productReducer;
