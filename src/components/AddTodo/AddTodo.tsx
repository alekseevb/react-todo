import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Angry, Plus } from 'lucide-react'
import { Wrapper } from './AddTodo'
import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'

interface ComponentNameProps {
	addTodo: (text: string) => void
}

export default function AddTodo({ addTodo }: ComponentNameProps) {
	const [inputValue, setInput] = useState('')
	const [error, setError] = useState(false)

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInput(event.target.value)
		if (error) {
			setError(false)
		}
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (inputValue.trim() === '') {
			setError(true)
			return
		}
		addTodo(inputValue)
		setInput('')
	}

	return (
		<form onSubmit={handleSubmit}>
			<Wrapper>
				<Input type='text' value={inputValue} onChange={handleInputChange} />
				<Button size='icon'>
					<Plus />
				</Button>
			</Wrapper>
			{error && (
				<Alert variant='destructive'>
					<Angry />
					<AlertTitle>
						<strong>Руки вверх</strong>
					</AlertTitle>
					<AlertDescription>Поле не может быть пустым</AlertDescription>
				</Alert>
			)}
		</form>
	)
}
