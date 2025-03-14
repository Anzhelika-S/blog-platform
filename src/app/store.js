import { configureStore } from "@reduxjs/toolkit";
import authReducer from "entities/auth/model/AuthSlice";
import blogApi from "shared/api/blogApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware),
});

export default store;
