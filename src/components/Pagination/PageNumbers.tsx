import { PaginationButton } from '@/components/Pagination/PaginationButton'

interface PageNumbersProps {
	currentPage: number
	totalPages: number
	onChangePage: (page: number) => void
}

export const PageNumbers = ({
	currentPage,
	totalPages,
	onChangePage,
}: PageNumbersProps) => {
	return (
		<>
			{Array.from({ length: totalPages }, (_, i) => (
				<PaginationButton
					key={i + 1}
					onClick={() => onChangePage(i + 1)}
					isActive={currentPage === i + 1}>
					{i + 1}
				</PaginationButton>
			))}
		</>
	)
}
