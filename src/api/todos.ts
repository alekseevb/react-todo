import axios from 'axios'

const API_URL = 'http://localhost:3001'

export const fetchTodos = async (page: number, limit: number) => {
	const response = await axios.get(
		`${API_URL}/todos?page=${page}&limit=${limit}`
	)
	return response.data
}

export const postTodo = async (text: string) => {
	const response = await axios.post(`${API_URL}/todos`, {
		text,
		completed: false,
	})
	return response.data
}

export const updateTodo = async (
	id: number,
	updateData: { text?: string; completed?: boolean }
) => {
	const response = await axios.put(`${API_URL}/todos/${id}`, updateData)
	return response.data
}

export const deleteTodo = async (id: number) => {
	const response = await axios.delete(`${API_URL}/todos/${id}`)
	return response.data
}
