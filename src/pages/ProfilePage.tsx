import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store/store'
import { useState } from 'react'
import { changePassword } from '@/features/auth/authSlice'

export default function ProfilePage() {
	const { user } = useSelector((state: RootState) => state.auth)
	const [oldPassword, setOldPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')

	const dispatch = useDispatch<AppDispatch>()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		dispatch(changePassword({ oldPassword, newPassword }))
			.unwrap()
			.then(res => {
				alert(res.message || 'Пароль изменён!')
				setOldPassword('')
				setNewPassword('')
			})
			.catch(err => {
				alert('Ошибка: ' + err)
			})
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Profile</Button>
			</DialogTrigger>

			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Профиль</DialogTitle>
					<DialogDescription>Здесь можно изменить пароль. Email изменить нельзя.</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className='grid gap-4'>
					<div className='grid gap-3'>
						<Label htmlFor='email'>Email</Label>
						<Input id='email' value={user?.email || ''} disabled />
					</div>
					<div className='grid gap-3'>
						<Label htmlFor='oldPassword'>Старый пароль</Label>
						<Input id='oldPassword' type='password' value={oldPassword} onChange={e => setOldPassword(e.target.value)} required />
					</div>
					<div className='grid gap-3'>
						<Label htmlFor='newPassword'>Новый пароль</Label>
						<Input id='newPassword' type='password' value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
					</div>

					<DialogFooter>
						<DialogClose asChild>
							<Button variant='outline'>Cancel</Button>
						</DialogClose>
						<Button type='submit'>Save changes</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
