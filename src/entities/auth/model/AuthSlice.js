import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast, Slide } from "react-toastify";

import { registerUser, loginUser, getUserInfo, editUserInfo } from "../api/userApi";
import { loadFavorited } from "features/ArticleList/model/ArticleListSlice";

const toastSuccess = {
  position: "top-left",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Slide,
};

const toastError = {
  position: "top-left",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Slide,
};

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  error: null,
};

export const sendRegistrationRequest = createAsyncThunk("auth/register", async (user) => {
  const response = await registerUser(JSON.stringify(user));
  localStorage.setItem("token", response.data.token);
  return response.data;
});

export const sendLoginRequest = createAsyncThunk("auth/login", async (user, { dispatch }) => {
  const response = await loginUser(JSON.stringify(user));
  localStorage.setItem("token", response.user.token);
  dispatch(loadFavorited(response.user.username));
  return response;
});

export const fetchUserInfo = createAsyncThunk("auth/fetchUser", async (_, { getState }) => {
  const token = getState().auth.token || localStorage.getItem("token");

  if (!token) return null;

  const response = await getUserInfo(token);
  return response;
});

export const sendEditRequest = createAsyncThunk("auth/editUser", async (user, { getState }) => {
  const token = getState().auth.token || localStorage.getItem("token");

  if (!token) return null;
  const response = await editUserInfo(user, token);
  return response;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("likedArticles");
});

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(sendRegistrationRequest.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.user.token;
        state.error = action.payload;
        toast.success("Now you are registered!", toastSuccess);
      })
      .addCase(sendRegistrationRequest.rejected, (state, action) => {
        state.error = action.payload;
        toast.error("Something went wrong, try again", toastError);
      })
      .addCase(sendLoginRequest.fulfilled, (state, action) => {
        toast.success("You're logged in!", toastSuccess);

        state.user = action.payload.user;
        state.token = action.payload.user.token;
        state.error = action.payload;
      })
      .addCase(sendLoginRequest.rejected, (state, action) => {
        state.error = action.payload;
        toast.error("Email or password is invalid, try again", toastError);
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(sendEditRequest.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;
        toast.success("Info edited successfully :)", toastSuccess);
      })
      .addCase(sendEditRequest.rejected, (state, action) => {
        state.error = action.payload;
        toast.error("Something went wrong, try again", toastError);
      })
      .addCase(logout.fulfilled, (state) => {
        toast.success("You logged out", toastSuccess);
        state.user = null;
        state.token = null;
      });
  },
});

export default AuthSlice.reducer;

export const selectToken = (state) => state.auth?.token;
export const selectUser = (state) => state.auth?.user;
