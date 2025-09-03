import { Pagination, PaginationContent } from '@/components/ui/pagination'
import { PrevButton, NextButton } from './PaginationButton'
import { PageNumbers } from './PageNumbers'
import { type PaginationDemoProps } from '@/components/Pagination/types'

export function PaginationDemo({
	page,
	totalPages,
	onChangePage,
}: PaginationDemoProps) {
	const isFirstPage = page === 1
	const isLastPage = page === totalPages

	return (
		<Pagination>
			<PaginationContent>
				<PrevButton
					onClick={() => onChangePage(Math.max(page - 1, 1))}
					disabled={isFirstPage}
				/>

				<PageNumbers
					currentPage={page}
					totalPages={totalPages}
					onChangePage={onChangePage}
				/>

				<NextButton
					onClick={() => onChangePage(Math.min(page + 1, totalPages))}
					disabled={isLastPage}
				/>
			</PaginationContent>
		</Pagination>
	)
}
