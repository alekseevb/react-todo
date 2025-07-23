import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'

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
		<div>
			<Input type='text' value={inputValue} onChange={onInputChange} />
			<Button size='icon' onClick={onAddTodo}>
				<Plus />
			</Button>
		</div>
	)
}
