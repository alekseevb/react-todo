interface Todo {
	id: number
	text: string
	completed: boolean
	createdAt: Date
}

export const getTodoFromLocalStorage = () => {
	return localStorage.getItem('todos')
}
export const setTodoToLocalStorage = (updateTodos: Todo[]) => {
	return localStorage.setItem('todos', JSON.stringify(updateTodos))
}
