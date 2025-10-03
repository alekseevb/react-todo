export interface Todo {
	id: number
	text: string
	completed: boolean
	createdAt: string // или Date
}

export interface PaginatedTodos {
	items: Todo[]
	total: number
	page: number
	limit: number
	totalPages: number
}
