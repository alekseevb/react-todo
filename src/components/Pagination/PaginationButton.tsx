import {
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
	PaginationNext,
} from '@/components/ui/pagination'
import { type PaginationButtonProps } from '@/components/Pagination/types'

export const PaginationButton = ({
	onClick,
	disabled = false,
	children,
	href = '#',
	isActive = false,
}: PaginationButtonProps) => {
	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault()
		if (!disabled) onClick()
	}

	return (
		<PaginationItem>
			<PaginationLink href={href} onClick={handleClick} isActive={isActive}>
				{children}
			</PaginationLink>
		</PaginationItem>
	)
}

export const PrevButton = ({ onClick, disabled }: PaginationButtonProps) => (
	<PaginationItem>
		<PaginationPrevious
			href='#'
			onClick={e => {
				e.preventDefault()
				if (!disabled) onClick()
			}}
		/>
	</PaginationItem>
)

export const NextButton = ({ onClick, disabled }: PaginationButtonProps) => (
	<PaginationItem>
		<PaginationNext
			href='#'
			onClick={e => {
				e.preventDefault()
				if (!disabled) onClick()
			}}
		/>
	</PaginationItem>
)
