import { configureStore } from "@reduxjs/toolkit";

// Reducers
import userReducer from "../slices/users/usersSlice";
import productReducer from "../slices/products/productsSlice";
import categoryReducer from "../slices/categories/categoriesSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
    category: categoryReducer,
  },
});

export default store;
