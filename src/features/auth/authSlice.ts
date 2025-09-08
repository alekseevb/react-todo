// src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

import api from '@/api/axios'

interface User {
	id: number
	email: string
	age?: number
}

interface AuthState {
	user: User | null
	token: string | null
	status: 'idle' | 'loading' | 'failed'
	error: string | null
}

const initialState: AuthState = {
	user: null,
	token: localStorage.getItem('accessToken') || null,
	status: 'idle',
	error: null,
}

// 🟢 Thunks

// Регистрация
export const registerUser = createAsyncThunk('auth/registerUser', async (data: { email: string; password: string; age?: number }, { rejectWithValue }) => {
	try {
		const response = await api.post(`/auth/register`, data)
		const { accessToken, refreshToken } = response.data
		localStorage.setItem('accessToken', accessToken)
		localStorage.setItem('refreshToken', refreshToken)
		return response.data.user
	} catch (err: any) {
		return rejectWithValue(err.response?.data?.message || 'Ошибка регистрации')
	}
})

// Логин
export const loginUser = createAsyncThunk('auth/loginUser', async (data: { email: string; password: string }, { rejectWithValue }) => {
	try {
		const response = await api.post(`/auth/login`, data)
		const { accessToken, refreshToken } = response.data
		localStorage.setItem('accessToken', accessToken)
		localStorage.setItem('refreshToken', refreshToken)
		return response.data.user
	} catch (err: any) {
		return rejectWithValue(err.response?.data?.message || 'Ошибка логина')
	}
})

// Получение профиля
export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async (_, { rejectWithValue }) => {
	try {
		const token = localStorage.getItem('accessToken')
		const response = await api.get(`/auth/me`, {
			headers: { Authorization: `Bearer ${token}` },
		})
		return response.data
	} catch (err: any) {
		return rejectWithValue(err.response?.data?.message || 'Ошибка получения профиля')
	}
})

// Смена пароля
export const changePassword = createAsyncThunk('auth/changePassword', async (data: { oldPassword: string; newPassword: string }, { rejectWithValue }) => {
	try {
		const token = localStorage.getItem('accessToken')
		const response = await api.post(`/auth/change-password`, data, {
			headers: { Authorization: `Bearer ${token}` },
		})
		return response.data
	} catch (err: any) {
		return rejectWithValue(err.response?.data?.message || 'Ошибка смены пароля')
	}
})

// Logout
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
	localStorage.removeItem('accessToken')
	localStorage.removeItem('refreshToken')
})

// 🔹 Slice
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			// Регистрация
			.addCase(registerUser.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
				state.status = 'idle'
				state.user = action.payload
				state.token = localStorage.getItem('accessToken')
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload as string
			})
			// Логин
			.addCase(loginUser.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
				state.status = 'idle'
				state.user = action.payload
				state.token = localStorage.getItem('accessToken')
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload as string
			})
			// Профиль
			.addCase(fetchUserProfile.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
				state.status = 'idle'
				state.user = action.payload
			})
			.addCase(fetchUserProfile.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload as string
			})
			// Смена пароля
			.addCase(changePassword.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(changePassword.fulfilled, state => {
				state.status = 'idle'
			})
			.addCase(changePassword.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload as string
			})
			// Logout
			.addCase(logoutUser.fulfilled, state => {
				state.user = null
				state.token = null
				state.status = 'idle'
			})
	},
})

export default authSlice.reducer
