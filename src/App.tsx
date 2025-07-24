import { useState } from 'react'
import { Box, Container, GlobalStyle } from './styles/GlobalStyle'
import AddTodo from './components/AddTodo/AddTodo.tsx'
import TodoItem from './components/TodoItem/TodoItem.tsx'

interface Todo {
	id: number
	text: string
	completed: boolean
	createdAt: Date
}

function App() {
	const [todos, setTodos] = useState<Todo[]>([])

	const addTodo = (inputValue: string) => {
		const newTodo: Todo = {
			id: Date.now(),
			text: inputValue,
			completed: false,
			createdAt: new Date(),
		}

		setTodos([...todos, newTodo])
	}

	const handleRemoveTodoBtnClick = (id: number) => {
		setTodos([...todos.filter(todo => todo.id !== id)])
	}

	const handleToggleTodo = () => {}

	return (
		<>
			<GlobalStyle />
			<Container>
				<Box>
					<AddTodo addTodo={addTodo} />
					<TodoItem
						todos={todos}
						removeTask={handleRemoveTodoBtnClick}></TodoItem>
				</Box>
			</Container>
		</>
	)
}

export default App
