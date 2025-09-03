import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'

interface PaginationDemoProps {
	page: number
	totalPages: number
	onChangePage: (page: number) => void
}

export function PaginationDemo({
	page,
	totalPages,
	onChangePage,
}: PaginationDemoProps) {
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href='#'
						onClick={e => {
							e.preventDefault()
							onChangePage(Math.max(page - 1, 1))
						}}
					/>
				</PaginationItem>

				{Array.from({ length: totalPages }, (_, i) => (
					<PaginationItem key={i}>
						<PaginationLink
							href='#'
							isActive={page === i + 1}
							onClick={e => {
								e.preventDefault()
								onChangePage(i + 1)
							}}>
							{i + 1}
						</PaginationLink>
					</PaginationItem>
				))}

				<PaginationItem>
					<PaginationNext
						href='#'
						onClick={e => {
							e.preventDefault()
							onChangePage(Math.min(page + 1, totalPages))
						}}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
