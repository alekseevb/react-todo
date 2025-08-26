import { Trash2 } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import './TodoItem.css'
import { DialogDemo } from './TodoItemDialog'
import type { Todo } from '../../types/todo'

// interface Todo {
// 	id: number
// 	text: string
// 	completed: boolean
// 	createdAt: Date
// }

interface ComponentNameProps {
	todos: Todo[]
	removeTask: (number: number) => void
	toggleTask: (number: number) => void
	editTodo: (id: number, text: string) => void
}

export default function TodoItem({
	todos,
	removeTask,
	toggleTask,
	editTodo,
}: ComponentNameProps) {
	return (
		<div className='flex flex-col gap-2'>
			{todos.map(todo => (
				<div key={todo.id} className='flex justify-between items-center gap-3'>
					<div className='flex items-center gap-2'>
						<Checkbox id={`${todo.id}`} onClick={() => toggleTask(todo.id)} />
						<Label
							htmlFor={`${todo.id}`}
							className={`${todo.completed ? 'complete' : ''} `}>
							{todo.text}
						</Label>
					</div>

					<div className='flex gap-1'>
						<DialogDemo todo={todo} editTodo={editTodo} />
						<Button onClick={() => removeTask(todo.id)}>
							<Trash2 />
						</Button>
					</div>
				</div>
			))}
		</div>
	)
}
