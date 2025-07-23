import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import { Wrapper } from './AddTodo'

interface ComponentNameProps {
	inputValue: string
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	onAddTodo: () => void
}

export default function AddTodo({
	inputValue,
	onInputChange,
	onAddTodo,
}: ComponentNameProps) {
	return (
		<Wrapper>
			<Input type='text' value={inputValue} onChange={onInputChange} />
			<Button size='icon' onClick={onAddTodo}>
				<Plus />
			</Button>
		</Wrapper>
	)
}
