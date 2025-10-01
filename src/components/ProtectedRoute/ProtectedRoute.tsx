// src/components/ProtectedRoute.tsx
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { type RootState } from '@/store/store'
import type { JSX } from 'react'

export function ProtectedRoute({ children }: { children: JSX.Element }) {
	const { token } = useSelector((state: RootState) => state.auth)
	if (!token) {
		return <Navigate to='/login' replace />
	}
	return children
}
