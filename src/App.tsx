import { HomePage, LoginForm, Navbar, RegisterForm } from '@/pages'
import { ThemeProvider, ProtectedRoute } from '@/components'
import { GlobalStyle } from '@/styles/GlobalStyle'
import type { AppDispatch, RootState } from '@/store/store'
import { fetchUserProfile } from '@/features/authSlice'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function App() {
	const dispatch = useDispatch<AppDispatch>()
	const { token } = useSelector((state: RootState) => state.auth)

	useEffect(() => {
		if (token) {
			dispatch(fetchUserProfile())
		}
	}, [token, dispatch])

	return (
		<ThemeProvider>
			<GlobalStyle />
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path='/login' element={<LoginForm />} />
					<Route path='/register' element={<RegisterForm />} />
					<Route
						path='/'
						element={
							<ProtectedRoute>
								<HomePage />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
