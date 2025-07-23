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
	const [inputValue, setInput] = useState('')

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInput(event.target.value)
	}

	const handleAddTodoBtnClick = () => {
		const newTodo: Todo = {
			id: Date.now(),
			text: inputValue,
			completed: false,
			createdAt: new Date(),
		}

		setTodos([...todos, newTodo])
		setInput('')
	}

	return (
		<>
			<GlobalStyle />
			<Container>
				<Box>
					<AddTodo
						inputValue={inputValue}
						onInputChange={handleInputChange}
						onAddTodo={handleAddTodoBtnClick}
					/>
					<TodoItem todos={todos}></TodoItem>
				</Box>
			</Container>
		</>
	)
}

export default App
