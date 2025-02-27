import { configureStore } from '@reduxjs/toolkit';

import articlesReducer from '../features/ArticleList/ArticleListSlice';

const store = configureStore({
  reducer: {
    articles: articlesReducer,
  },
});

export default store;
