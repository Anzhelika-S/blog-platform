import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchArticles } from "entities/article/api/articlesApi.js";

const initialState = {
  loading: false,
  articles: [],
  articlesCount: 0,
  error: "",
};

export const loadArticles = createAsyncThunk("articles/fetchArticles", async (page) => {
  return await fetchArticles(page);
});

const ArticleListSlice = createSlice({
  name: "articles",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadArticles.fulfilled, (state, actions) => {
        state.loading = false;
        state.articles = actions.payload.articles;
        state.articlesCount = actions.payload.articlesCount;
        state.error = "";
      })
      .addCase(loadArticles.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.error.message;
      });
  },
});

export default ArticleListSlice.reducer;

export const selectArticlesCount = (state) => state.articles.articlesCount;
export const selectArticles = (state) => state.articles;
