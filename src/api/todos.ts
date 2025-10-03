import api from 'axios'
import { type Todo } from '@/types/todo'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const fetchTodos = async (page: number, limit: number) => {
	const token = localStorage.getItem('accessToken')
	if (!token) throw new Error('Нет токена авторизации')

	const response = await api.get(`${API_URL}/todos?page=${page}&limit=${limit}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return response.data
}

export const postTodo = async (text: string): Promise<Todo> => {
	const token = localStorage.getItem('accessToken')
	if (!token) throw new Error('Нет токена авторизации')

	const response = await api.post<Todo>(
		`${API_URL}/todos`,
		{
			text,
			completed: false,
			createdAt: new Date().toISOString(),
		},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	)
	return response.data
}

export const updateTodo = async (id: number, updateData: Partial<Omit<Todo, 'id' | 'createdAt'>>): Promise<Todo> => {
	const token = localStorage.getItem('accessToken')
	if (!token) throw new Error('Нет токена авторизации')

	const response = await api.put<Todo>(`${API_URL}/todos/${id}`, updateData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return response.data
}

export const deleteTodo = async (id: number): Promise<{ id: number }> => {
	const token = localStorage.getItem('accessToken')
	if (!token) throw new Error('Нет токена авторизации')

	await api.delete(`${API_URL}/todos/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return { id }
}
