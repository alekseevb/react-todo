import { useState } from 'react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Plus } from 'lucide-react'
import { GlobalStyle } from './styles/GlobalStyle'
import AddTodo from './components/AddTodo/AddTodo'

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
			<AddTodo
				inputValue={inputValue}
				onInputChange={handleInputChange}
				onAddTodo={handleAddTodoBtnClick}
			/>
			{todos.map(todo => (
				<p>{todo.text}</p>
			))}
		</>
	)
}

export default App
