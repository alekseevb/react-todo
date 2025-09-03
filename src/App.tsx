import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Container, GlobalStyle } from '@/styles/GlobalStyle'
import AddTodo from '@/components/AddTodo/AddTodo'
import TodoItem from '@/components/TodoItem/TodoItem'
import { ThemeProvider } from '@/components/Theme-provider/Theme-provider'
import { PaginationDemo } from '@/components/Pagination/PaginationDemo'
import SelectOption from '@/components/Select/Select'
import { type AppDispatch, type RootState } from '@/store/store'
import { SkeletonDemo } from '@/components/SceletonDemo/SceletonDemo'
import {
	deleteTodoThunk,
	fetchTodosThunk,
	postTodoThunk,
	setLimit,
	setPage,
	updateTodoThunk,
} from '@/features/todos/todoSlice'

function App() {
	const dispatch = useDispatch<AppDispatch>()
	const { todos, page, limit, totalPages, loading, error } = useSelector(
		(state: RootState) => state.todos
	)

	useEffect(() => {
		dispatch(fetchTodosThunk({ page, limit }))
	}, [page, limit, dispatch])

	const addTodo = (inputValue: string) => {
		if (!inputValue.trim()) return
		dispatch(postTodoThunk(inputValue))
	}

	const handleRemoveTodoBtnClick = (id: number) => {
		dispatch(deleteTodoThunk(id))
	}

	const handleToggleTodo = (id: number) => {
		const todo = todos.find(t => t.id === id)
		if (!todo) return
		dispatch(updateTodoThunk({ id, data: { completed: !todo.completed } }))
	}

	const handleEditTodo = (id: number, newText: string) => {
		dispatch(updateTodoThunk({ id, data: { text: newText } }))
	}

	console.log(JSON.stringify(todos, null, 2))

	return (
		<ThemeProvider>
			<GlobalStyle />
			<Container>
				<Box>
					<AddTodo addTodo={addTodo} />
					<SelectOption
						value={limit}
						onChange={val => dispatch(setLimit(val))}
					/>

					{loading && <SkeletonDemo />}
					{error && <p className='error'>{error}</p>}

					{!loading && !error && (
						<TodoItem
							todos={todos}
							removeTask={handleRemoveTodoBtnClick}
							toggleTask={handleToggleTodo}
							editTodo={handleEditTodo}
						/>
					)}

					<PaginationDemo
						page={page}
						totalPages={totalPages}
						onChangePage={p => dispatch(setPage(p))}
					/>
				</Box>
			</Container>
		</ThemeProvider>
	)
}

export default App
