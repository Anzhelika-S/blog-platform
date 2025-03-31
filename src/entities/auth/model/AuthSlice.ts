import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { toastSuccess } from "shared/ui/toasts/toastNotifications";

interface IinitialState {
  user: null | {
    token: string,
    image: string,
    username: string
  },
  token: null | string,
  error: null | Error
}

const initialState : IinitialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  error: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;

      localStorage.removeItem("token");
      toast.success("You have logged out", toastSuccess);
    },
  },
});

export const { setUser, logout } = AuthSlice.actions;
export default AuthSlice.reducer;

export const selectToken = (state: RootState) => state.auth?.token;
export const selectUser = (state: RootState) => state.auth?.user;
