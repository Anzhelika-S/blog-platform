import { toast } from 'react-toastify'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { deleteArticleFromList, updateArticleList } from 'features/ArticleList/model/ArticleListSlice'

import {
  createArticle,
  deleteArticle,
  favoriteArticle,
  getArticle,
  unfavoriteArticle,
  updateArticle,
} from '../api/articleApi'

const updateLikedArticles = (slug, favorited) => {
  let likedArticles = JSON.parse(localStorage.getItem('likedArticles')) || []

  if (favorited) {
    likedArticles.push(slug)
  } else {
    likedArticles = likedArticles.filter((s) => s !== slug)
  }

  localStorage.setItem('likedArticles', JSON.stringify(likedArticles))
}

const initialState = {
  article: [],
  isLoading: false,
  error: null,
}

export const fetchArticle = createAsyncThunk('article/fetch', async (slug) => {
  const response = await getArticle(slug)

  const likedSlugs = JSON.parse(localStorage.getItem('likedArticles')) || []

  if (likedSlugs.includes(response.article.slug)) {
    return {
      article: {
        ...response.article,
        favorited: true,
      },
    }
  }

  return response
})

export const postArticle = createAsyncThunk('article/post', async (article, { getState }) => {
  const token = getState().auth.token || localStorage.getItem('token')

  if (!token) return null

  try {
    const response = await createArticle(JSON.stringify(article), token)
    return response
  } catch (err) {
    console.log(err)
  }
})

export const sendUpdateRequest = createAsyncThunk('article/update', async ({ article, slug }, { getState }) => {
  const token = getState().auth.token || localStorage.getItem('token')
  if (!token) return null

  try {
    const response = await updateArticle(JSON.stringify(article), slug, token)
    return response
  } catch (err) {
    console.log(err)
  }
})

export const sendDeleteRequest = createAsyncThunk('article/delete', async (slug, { getState, dispatch }) => {
  const token = getState().auth.token || localStorage.getItem('token')

  if (!token) return null

  try {
    const response = await deleteArticle(slug, token)

    dispatch(deleteArticleFromList(slug))

    return response
  } catch (err) {
    console.log(err)
  }
})

export const sendFavoriteRequest = createAsyncThunk('article/favorite', async (slug, { getState, dispatch }) => {
  const token = getState().auth.token || localStorage.getItem('token')

  if (!token) return null

  try {
    const response = await favoriteArticle(slug, token)

    updateLikedArticles(slug, response.article.favorited)
    dispatch(updateArticleList(response.article))

    return response
  } catch (err) {
    console.log(err)
  }
})

export const sendUnfavoriteRequest = createAsyncThunk('article/unfavorite', async (slug, { getState, dispatch }) => {
  const token = getState().auth.token || localStorage.getItem('token')

  if (!token) return null

  try {
    const response = await unfavoriteArticle(slug, token)

    updateLikedArticles(slug, response.article.favorited)
    dispatch(updateArticleList(response.article))

    return response
  } catch (err) {
    console.log(err)
  }
})

const articleSlice = createSlice({
  name: 'article',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.error = null
        state.article = action.payload.article
        state.isLoading = false
      })
      .addCase(fetchArticle.pending, (state) => {
        state.error = null
        state.isLoading = true
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.error = action.payload
        state.isLoading = false
        toast.error('Couldn\'t load the article, try again')
      })
      .addCase(postArticle.fulfilled, (state, action) => {
        state.error = null
        state.article = action.payload.article
        toast.success('Article has been created!')
      })
      .addCase(postArticle.rejected, (state, action) => {
        state.error = action.payload
        toast.error('Couldn\'t create an article, please try again')
      })
      .addCase(sendUpdateRequest.fulfilled, (state, action) => {
        state.error = null
        state.article = action.payload.article
        toast.success('Article has been updated!')
      })
      .addCase(sendUpdateRequest.rejected, (state, action) => {
        state.error = action.payload
        toast.error('Couldn\'t update an article, please try again')
      })
      .addCase(sendDeleteRequest.fulfilled, (state) => {
        state.article = null
        state.error = null
        toast.success('Article deleted')
      })
      .addCase(sendDeleteRequest.rejected, (state, action) => {
        state.article = null
        state.error = action.payload
        toast.error('Couldn\'t delete the article, please try again')
      })
      .addCase(sendFavoriteRequest.fulfilled, (state, action) => {
        state.article = action.payload.article
        state.error = null
      })
      .addCase(sendFavoriteRequest.rejected, (state, action) => {
        state.error = action.payload
        toast.error('Couldn\'t favorite the article, please try again')
      })
      .addCase(sendUnfavoriteRequest.fulfilled, (state, action) => {
        state.article = action.payload.article
        state.error = null
      })
      .addCase(sendUnfavoriteRequest.rejected, (state, action) => {
        state.error = action.payload
        toast.error('Couldn\'t unfavorite the article, please try again')
      })
  },
})

export default articleSlice.reducer
