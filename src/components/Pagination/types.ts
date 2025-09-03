export interface PaginationButtonProps {
	onClick: () => void
	disabled?: boolean
	children?: React.ReactNode // сделали опциональным
	href?: string
	isActive?: boolean
	type?: 'number' | 'prev' | 'next' // добавили тип для区分
}

export interface PaginationDemoProps {
	page: number
	totalPages: number
	onChangePage: (page: number) => void
}
