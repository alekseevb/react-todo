import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

interface SelectOptionProps {
	value: number
	onChange: (value: number) => void
}

export default function SelectOption({ value, onChange }: SelectOptionProps) {
	return (
		<Select value={String(value)} onValueChange={val => onChange(Number(val))}>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder='Отобразить' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='5'>5 задач</SelectItem>
				<SelectItem value='10'>10 задач</SelectItem>
				<SelectItem value='100'>все задачи</SelectItem>
			</SelectContent>
		</Select>
	)
}
