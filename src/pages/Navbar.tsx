import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store/store'
import { logoutUser } from '@/features/auth/authSlice'

function Navbar() {
	const dispatch = useDispatch<AppDispatch>()
	const { token, user } = useSelector((state: RootState) => state.auth)

	return (
		<nav
			className={cn(
				'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none dark:text-white '
			)}>
			<Link to='/' className={cn('mr-2')}>
				Home
			</Link>
			{!token ? (
				<>
					<Link to='/login' className={cn('mr-2')}>
						Login
					</Link>
					<Link to='/register' className={cn('mr-2')}>
						Register
					</Link>
				</>
			) : (
				<>
					<span className={cn('mr-2')}>👋 {user?.email || 'User'}</span>
					<button onClick={() => dispatch(logoutUser())}>Logout</button>
				</>
			)}
		</nav>
	)
}

export default Navbar
