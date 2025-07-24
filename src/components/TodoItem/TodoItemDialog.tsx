import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Pencil } from 'lucide-react'
import { useState } from 'react'

interface Todo {
	id: number
	text: string
	completed: boolean
	createdAt: Date
}

interface DialogDemoProps {
	todo: Todo
	editTodo: (id: number, newText: string) => void
}

export function DialogDemo({ editTodo, todo }: DialogDemoProps) {
	const [input, setInput] = useState(todo.text)

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInput(event.target.value)
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		editTodo(todo.id, input)
	}

	return (
		<Dialog>
			<form>
				<DialogTrigger asChild>
					<Button variant='outline'>
						<Pencil />
					</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[425px]'>
					<form onSubmit={handleSubmit} className='grid gap-4'>
						<DialogHeader>
							<DialogTitle>Изменить задачу</DialogTitle>
							<DialogDescription>
								Сделай изменения в задаче здесь. Когда будешь готов нажми
								сохранить
							</DialogDescription>
						</DialogHeader>

						<div className='grid gap-3'>
							<Label htmlFor='name-1'>Задача</Label>
							<Input value={input} onChange={handleInputChange} />
						</div>

						<DialogFooter>
							<DialogClose asChild>
								<Button variant='outline'>Отменить</Button>
							</DialogClose>
							<DialogClose asChild>
								<Button type='submit'>Сохранить</Button>
							</DialogClose>
						</DialogFooter>
					</form>
				</DialogContent>
			</form>
		</Dialog>
	)
}
