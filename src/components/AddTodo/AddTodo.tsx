import { useState } from 'react'
import { Angry, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Wrapper } from '@/components/AddTodo/index'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ModeToggle } from '@/components/Mode-toggle/mode-toggle'

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
			<Wrapper className='flex gap-1'>
				<Input type='text' value={inputValue} onChange={handleInputChange} />
				<Button size='icon'>
					<Plus />
				</Button>
				<ModeToggle />
			</Wrapper>
			{error && (
				<Alert variant='destructive' className='mb-2'>
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
