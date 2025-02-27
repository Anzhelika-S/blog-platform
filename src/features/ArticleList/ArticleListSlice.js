import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  articles: [],
  articlesCount: 0,
  error: '',
};

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (page) => {
  return await axios
    .get(`https://blog-platform.kata.academy/api/articles?offset=${page}&limit=20`)
    .then((response) => response.data);
});

const ArticleListSlice = createSlice({
  name: 'articles',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchArticles.fulfilled, (state, actions) => {
      state.loading = false;
      state.articles = actions.payload.articles;
      state.articlesCount = actions.payload.articlesCount;
      state.error = '';
    });
    builder.addCase(fetchArticles.rejected, (state, actions) => {
      state.loading = false;
      state.error = actions.error.message;
    });
  },
});

export default ArticleListSlice.reducer;

export const selectArticlesCount = (state) => state.articles.articlesCount;
export const selectArticles = (state) => state.articles;
