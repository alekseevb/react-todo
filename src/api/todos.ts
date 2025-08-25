import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export interface Todo {
	id: number
	text: string
	completed: boolean
	createdAt: string // будем хранить ISO-дату
}

export interface PaginatedTodos {
	items: Todo[]
	total: number
	page: number
	limit: number
	totalPages: number
}

// Получение задачи
export const fetchTodos = async (page: number, limit: number) => {
	const response = await axios.get(
		`${API_URL}/todos?page=${page}&limit=${limit}`
	)
	console.log(response.data)
	return response.data // объект с data, total, page, limit, totalPages
}

// Создание задачи
export const postTodo = async (text: string): Promise<Todo> => {
	const response = await axios.post<Todo>(`${API_URL}/todos`, {
		text,
		completed: false,
		createdAt: new Date().toISOString(),
	})
	return response.data
}

// Частичное обновление задачи
export const updateTodo = async (
	id: number,
	updateData: Partial<Omit<Todo, 'id' | 'createdAt'>>
): Promise<Todo> => {
	const response = await axios.put<Todo>(`${API_URL}/todos/${id}`, updateData)
	return response.data
}

// Удаление задачи
export const deleteTodo = async (id: number): Promise<{ id: number }> => {
	await axios.delete(`${API_URL}/todos/${id}`)
	return { id }
}
