import { configureStore } from "@reduxjs/toolkit";

import articlesReducer from "../features/ArticleList/model/ArticleListSlice";
import authReducer from '../entities/auth/model/AuthSlice'

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    auth: authReducer
  },
});

export default store;
