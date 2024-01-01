import { configureStore } from "@reduxjs/toolkit";

// Reducers
import userReducer from "../slices/users/usersSlice";
import productReducer from "../slices/products/productsSlice";
import categoryReducer from "../slices/categories/categoriesSlice";
import brandReducer from "../slices/brands/brandsSlice";
import colorReducer from "../slices/colors/colorsSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
    category: categoryReducer,
    brands: brandReducer,
    colors: colorReducer,
  },
});

export default store;
