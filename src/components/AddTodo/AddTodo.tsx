import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import { Wrapper } from './AddTodo'
import { useState } from 'react'

interface ComponentNameProps {
	addTodo: (text: string) => void
}

export default function AddTodo({ addTodo }: ComponentNameProps) {
	const [inputValue, setInput] = useState('')

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInput(event.target.value)
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
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
		</form>
	)
}
