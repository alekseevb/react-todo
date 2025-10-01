import { ThemeProvider } from '@/components/Theme-provider/Theme-provider'
import { GlobalStyle } from '@/styles/GlobalStyle'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import LoginForm from '@/pages/LoginForm'
import RegisterForm from '@/pages/RegisterForm'
import Navbar from './pages/Navbar'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store/store'
import { fetchUserProfile } from './features/auth/authSlice'

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
