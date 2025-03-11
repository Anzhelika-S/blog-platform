import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog-platform.kata.academy/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token || localStorage.getItem("token");

      if (token) {
        headers.set("authorization", `Token ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Articles", "Users", "Article"],
  endpoints: (builder) => ({
    fetchArticles: builder.query({
      query: (page) => `articles?offset=${page}&limit=20`,
      providesTags: ["Articles"],
    }),
    registerUser: builder.mutation({
      query: (user) => ({
        url: "users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: "users/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    getUserInfo: builder.query({
      query: () => `user`,
      providesTags: ["Users"],
    }),
    editUserInfo: builder.mutation({
      query: (user) => ({
        url: "user",
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    fetchArticle: builder.query({
      query: (slug) => `articles/${slug}`,
      providesTags: ["Article"],
    }),
    createArticle: builder.mutation({
      query: (article) => ({
        url: "articles",
        method: "POST",
        body: article,
      }),
      invalidatesTags: ["Articles"],
    }),
    updateArticle: builder.mutation({
      query: ({ article, slug }) => ({
        url: `articles/${slug}`,
        method: "PUT",
        body: article,
      }),
      invalidatesTags: ["Article", "Articles"],
    }),
    deleteArticle: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Articles"],
    }),
    favoriteArticle: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: "POST",
      }),
      invalidatesTags: ["Articles", "Article"],
    }),
    unfavoriteArticle: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: "DELETE",
      }),
      invalidatesTags: ["Articles", "Article"],
    }),
  }),
});

export default blogApi;
export const {
  useFetchArticlesQuery,
  useLoginUserMutation,
  useGetUserInfoQuery,
  useRegisterUserMutation,
  useEditUserInfoMutation,
  useFetchArticleQuery,
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
  useUpdateArticleMutation,
} = blogApi;
