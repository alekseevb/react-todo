import { useEffect, useState } from 'react'
import { Box, Container, GlobalStyle } from './styles/GlobalStyle'
import AddTodo from './components/AddTodo/AddTodo.tsx'
import TodoItem from './components/TodoItem/TodoItem.tsx'
import {
	getTodoFromLocalStorage,
	setTodoToLocalStorage,
} from './utils/localStorage.ts'
import { ThemeProvider } from './components/Theme-provider/Theme-provider.tsx'
import { deleteTodo, fetchTodos, postTodo, updateTodo } from './api/todos.ts'

interface Todo {
	id: number
	text: string
	completed: boolean
	createdAt: Date
}

function App() {
	const [todos, setTodos] = useState<Todo[]>([])

	useEffect(() => {
		const loadTodos = async () => {
			try {
				const serverTodos: Todo[] = await fetchTodos(1, 10) // page=1, limit=10
				setTodos(serverTodos)
				setTodoToLocalStorage(serverTodos)
			} catch (error) {
				console.error('Ошибка загрузки с сервера:', error)
				// Фолбэк на localStorage
				const localTodos = getTodoFromLocalStorage()
				if (localTodos) {
					setTodos(JSON.parse(localTodos))
				}
			}
		}
		loadTodos()
	}, [])

	const addTodo = async (inputValue: string): Promise<void> => {
		if (!inputValue.trim()) return
		try {
			const newTodo = await postTodo(inputValue)
			const updatedTodos = [...todos, newTodo]
			setTodos(updatedTodos)
			setTodoToLocalStorage(updatedTodos)
		} catch (error) {
			console.error('Ошибка добавления задачи:', error)
		}
	}

	const handleRemoveTodoBtnClick = async (id: number): Promise<void> => {
		try {
			await deleteTodo(id)
			const updatedTodos = todos.filter(todo => todo.id !== id)
			setTodos(updatedTodos)
			setTodoToLocalStorage(updatedTodos)
		} catch (error) {
			console.error('Ошибка удаления задачи:', error)
		}
	}

	const handleToggleTodo = async (id: number): Promise<void> => {
		const todo = todos.find(t => t.id === id)
		if (!todo) return
		try {
			const updated = await updateTodo(id, { completed: !todo.completed })
			const updatedTodos = todos.map(t => (t.id === id ? updated : t))
			setTodos(updatedTodos)
			setTodoToLocalStorage(updatedTodos)
		} catch (error) {
			console.error('Ошибка изменения статуса:', error)
		}
	}

	const handleEditTodo = async (id: number, newText: string): Promise<void> => {
		try {
			const updated = await updateTodo(id, { text: newText })
			const updatedTodos = todos.map(t => (t.id === id ? updated : t))
			setTodos(updatedTodos)
			setTodoToLocalStorage(updatedTodos)
		} catch (error) {
			console.error('Ошибка редактирования задачи:', error)
		}
	}

	console.log(JSON.stringify(todos, null, 2))
	return (
		<ThemeProvider>
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
		</ThemeProvider>
	)
}

export default App
