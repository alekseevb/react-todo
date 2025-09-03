// src/features/todos/todoSlice.ts
import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchTodos, postTodo, updateTodo, deleteTodo } from '@/api/todos'
import type { Todo } from '../../types/todo'

// export interface Todo {
// 	id: number
// 	text: string
// 	completed: boolean
// 	createdAt: string
// }

interface TodosState {
	todos: Todo[]
	page: number
	limit: number
	totalPages: number
	loading: boolean
	error: string | null
}

const initialState: TodosState = {
	todos: [],
	page: 1,
	limit: 5,
	totalPages: 1,
	loading: false,
	error: null,
}

// 🔹 Thunks
export const fetchTodosThunk = createAsyncThunk(
	'todos/fetchTodos',
	async ({ page, limit }: { page: number; limit: number }) => {
		const response = await fetchTodos(page, limit)
		return response
	}
)

export const postTodoThunk = createAsyncThunk(
	'todos/postTodo',
	async (text: string) => {
		return await postTodo(text)
	}
)

export const deleteTodoThunk = createAsyncThunk(
	'todos/deleteTodo',
	async (id: number) => {
		await deleteTodo(id)
		return id
	}
)

export const updateTodoThunk = createAsyncThunk(
	'todos/updateTodo',
	async ({ id, data }: { id: number; data: Partial<Todo> }) => {
		return await updateTodo(id, data)
	}
)

const todoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		setPage(state, action: PayloadAction<number>) {
			state.page = action.payload
		},
		setLimit(state, action: PayloadAction<number>) {
			state.limit = action.payload
		},
	},
	extraReducers: builder => {
		builder
			// fetchTodos
			.addCase(fetchTodosThunk.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchTodosThunk.fulfilled, (state, action) => {
				state.loading = false
				state.todos = action.payload.data
				state.totalPages = action.payload.totalPages
			})
			.addCase(fetchTodosThunk.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message ?? 'Ошибка загрузки'
			})
			// postTodo
			.addCase(postTodoThunk.fulfilled, (state, action) => {
				state.todos.push(action.payload)
			})
			// deleteTodo
			.addCase(deleteTodoThunk.fulfilled, (state, action) => {
				state.todos = state.todos.filter(todo => todo.id !== action.payload)
			})
			// updateTodo
			.addCase(updateTodoThunk.fulfilled, (state, action) => {
				state.todos = state.todos.map(todo =>
					todo.id === action.payload.id ? action.payload : todo
				)
			})
	},
})

export const { setPage, setLimit } = todoSlice.actions
export default todoSlice.reducer
