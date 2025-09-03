import type { RootState } from '@/store/store'

export const selectTodos = (s: RootState) => s.todos.todos
export const selectPage = (s: RootState) => s.todos.page
export const selectLimit = (s: RootState) => s.todos.limit
export const selectTotalPages = (s: RootState) => s.todos.totalPages
export const selectLoading = (s: RootState) => s.todos.loading
export const selectError = (s: RootState) => s.todos.error
