import { useEffect, useState } from 'react'
import { Box, Container, GlobalStyle } from './styles/GlobalStyle'
import AddTodo from './components/AddTodo/AddTodo.tsx'
import TodoItem from './components/TodoItem/TodoItem.tsx'
import {
	getTodoFromLocalStorage,
	setTodoToLocalStorage,
} from './utils/localStorage.ts'

interface Todo {
	id: number
	text: string
	completed: boolean
	createdAt: Date
}

function App() {
	const [todos, setTodos] = useState<Todo[]>([])

	useEffect(() => {
		const localTodos = getTodoFromLocalStorage()
		if (localTodos) {
			setTodos(JSON.parse(localTodos))
		}
	}, [])

	const addTodo = (inputValue: string) => {
		const newTodo: Todo = {
			id: Date.now(),
			text: inputValue,
			completed: false,
			createdAt: new Date(),
		}

		const updateTodos = [...todos, newTodo]

		setTodos(updateTodos)

		setTodoToLocalStorage(updateTodos)
	}

	const handleRemoveTodoBtnClick = (id: number) => {
		const updateTodos = todos.filter(todo => todo.id !== id)
		setTodos(updateTodos)

		setTodoToLocalStorage(updateTodos)
	}

	const handleToggleTodo = (id: number) => {
		setTodos([
			...todos.map(todo =>
				todo.id === id ? { ...todo, completed: !todo.completed } : { ...todo }
			),
		])
	}

	const handleEditTodo = (id: number, newText: string) => {
		const updateTodos = todos.map(todo =>
			todo.id === id ? { ...todo, text: newText } : todo
		)
		setTodos(updateTodos)

		setTodoToLocalStorage(updateTodos)
	}

	return (
		<>
			<GlobalStyle />
			<Container>
				<Box>
					<AddTodo addTodo={addTodo} />
					<TodoItem
						todos={todos}
						removeTask={handleRemoveTodoBtnClick}
						toggleTask={handleToggleTodo}
						editTodo={handleEditTodo}
					/>
				</Box>
			</Container>
		</>
	)
}

export default App
