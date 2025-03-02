import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { registerUser, loginUser, getUserInfo } from '../api/userApi'

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    error: null,
}

export const sendRegistrationRequest = createAsyncThunk('auth/register', async (user) => {
    const response = await registerUser(JSON.stringify(user))
    localStorage.setItem('token', response.data.token)
    return response.data
})

export const sendLoginRequest = createAsyncThunk('auth/login', async (user) => {
    const response = await loginUser(JSON.stringify(user))
    if (response.token) localStorage.setItem('token', response.data.user.token)
    return response
})

export const fetchUserInfo = createAsyncThunk('auth/fetchUser', async (_, {getState }) => {
    const token = getState().auth.token || localStorage.getItem('token')
    if(!token) return null

    const response = await getUserInfo(token)
    return response.data
})

export const logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('token')
})

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(sendRegistrationRequest.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.user.token
            state.error = action.payload
        })
        .addCase(sendRegistrationRequest.rejected, (state,action) => {
            state.error = action.payload
        })
        .addCase(sendLoginRequest.fulfilled, (state, action) => {
            console.log(action.payload);
            
            state.user = action.payload.user
            state.token = action.payload.user.token
            state.error = action.payload
        })
        .addCase(sendLoginRequest.rejected, (state,action) => {
            state.error = action.payload
        })
        .addCase(fetchUserInfo.fulfilled, (state,action) => {
            state.user = action.payload.user
            state.error = action.payload
        })
        .addCase(fetchUserInfo.rejected, (state,action) => {
            state.error = action.payload
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null
            state.token = null
        })
    }
})

export default AuthSlice.reducer

export const selectToken = state => state.auth?.token
export const selectUser = state => state.auth?.user