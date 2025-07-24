import { Trash2, Pencil } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface Todo {
	id: number
	text: string
	completed: boolean
	createdAt: Date
}

interface ComponentNameProps {
	todos: Todo[]
	removeTask: (number: number) => void
}

export default function TodoItem({ todos, removeTask }: ComponentNameProps) {
	return (
		<div className='flex flex-col gap-2'>
			{todos.map(todo => (
				<div key={todo.id} className='flex justify-between items-center gap-3'>
					<div className='flex items-center gap-2'>
						<Checkbox id={`${todo.id}`} />
						<Label htmlFor={`${todo.id}`}>{todo.text}</Label>
					</div>

					<div className='flex gap-2'>
						<Button variant='outline'>
							<Pencil />
						</Button>
						<Button variant='outline' onClick={() => removeTask(todo.id)}>
							<Trash2 />
						</Button>
					</div>
				</div>
			))}
		</div>
	)
}
