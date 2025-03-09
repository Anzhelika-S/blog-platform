import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { fetchArticles } from '../api/articlesApi'

const initialState = {
  loading: false,
  articles: [],
  articlesCount: 0,
  error: '',
}

export const loadArticles = createAsyncThunk('articles/fetchArticles', async (page) => {
  const articles = await fetchArticles(page)

  const likedSlugs = JSON.parse(localStorage.getItem('likedArticles')) || []

  return {
    articles: articles.articles.map((article) => ({
      ...article,
      favorited: likedSlugs.includes(article.slug),
    })),
    articlesCount: articles.articlesCount,
  }
})

const ArticleListSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    updateArticleList(state, action) {
      const updatedArticle = action.payload
      const index = state.articles.findIndex((a) => a.slug === updatedArticle.slug)
      if (index !== -1) {
        state.articles[index] = updatedArticle
      }
    },
    deleteArticleFromList: (state, action) => {
      state.articles = state.articles.filter((article) => article.slug !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadArticles.pending, (state) => {
        state.loading = true
      })
      .addCase(loadArticles.fulfilled, (state, actions) => {
        state.loading = false
        state.articles = actions.payload.articles
        state.articlesCount = actions.payload.articlesCount
        state.error = ''
      })
      .addCase(loadArticles.rejected, (state, actions) => {
        state.loading = false
        state.error = actions.error.message
      })
  },
})

export const { deleteArticleFromList, updateArticleList } = ArticleListSlice.actions
export default ArticleListSlice.reducer

export const selectArticlesCount = (state) => state.articles.articlesCount
export const selectArticles = (state) => state.articles
