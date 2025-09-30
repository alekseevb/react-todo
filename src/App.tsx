import { ThemeProvider } from '@/components/Theme-provider/Theme-provider'
import { GlobalStyle } from '@/styles/GlobalStyle'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import LoginForm from '@/pages/LoginForm'
import RegisterForm from '@/pages/RegisterForm'

function App() {
	return (
		<ThemeProvider>
			<GlobalStyle />
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/login' element={<LoginForm />} />
					<Route path='/register' element={<RegisterForm />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
