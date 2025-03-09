import { configureStore } from '@reduxjs/toolkit'

import articlesReducer from '../features/ArticleList/model/ArticleListSlice'
import authReducer from '../entities/auth/model/AuthSlice'
import articleReducer from '../entities/article/model/articleSlice'

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    auth: authReducer,
    article: articleReducer,
  },
})

export default store
