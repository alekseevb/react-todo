import { Button } from '@/components/ui/button'
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '@/features/auth/authSlice'
import { type RootState, type AppDispatch } from '@/store/store'
import { Link, useNavigate } from 'react-router-dom'

const loginSchema = z.object({
	email: z.string().email({ message: 'Неверный email' }),
	password: z.string().min(6, 'Пароль минимум 6 символов'),
})

type LoginFormInputs = z.infer<typeof loginSchema>

export function LoginForm() {
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()
	const { status, error, token } = useSelector((state: RootState) => state.auth)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>({
		resolver: zodResolver(loginSchema),
	})

	const onSubmit = async (data: LoginFormInputs) => {
		const result = await dispatch(loginUser(data))
		if (loginUser.fulfilled.match(result)) {
			// успешный логин → редирект
			navigate('/')
		}
	}

	return (
		<Card className='w-full max-w-sm'>
			<CardHeader>
				<CardTitle>Login to your account</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='flex flex-col gap-6'>
						<div className='grid gap-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								placeholder='m@example.com'
								{...register('email')}
							/>
							{errors.email && (
								<p className='text-red-500 text-sm'>{errors.email.message}</p>
							)}
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='password'>Password</Label>
							<Input id='password' type='password' {...register('password')} />
							{errors.password && (
								<p className='text-red-500 text-sm'>
									{errors.password.message}
								</p>
							)}
						</div>
						{error && <p className='text-red-500 text-sm'>{error}</p>}
					</div>
					<Button
						type='submit'
						className='w-full mt-4'
						disabled={status === 'loading'}>
						{status === 'loading' ? 'Logging in...' : 'Login'}
					</Button>
					<div className='mt-4 text-center text-sm'>
						Don&apos;t have an account?{' '}
						<Link to='/register' className='underline underline-offset-4'>
							Sign up
						</Link>
					</div>
				</form>
			</CardContent>
		</Card>
	)
}

export default LoginForm
