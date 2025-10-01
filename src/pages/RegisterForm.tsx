import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '@/features/auth/authSlice'
import { type RootState, type AppDispatch } from '@/store/store'
import { Link, useNavigate } from 'react-router-dom'
import { Container } from '@/styles/GlobalStyle'

// схема валидации
const registerSchema = z.object({
	email: z.string().email({ message: 'Неверный email' }),
	password: z.string().min(6, 'Пароль минимум 6 символов'),
	age: z.number().min(0, 'Возраст не может быть отрицательным').optional(),
})

type RegisterFormInputs = z.infer<typeof registerSchema>

export function RegisterForm() {
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()
	const { status, error } = useSelector((state: RootState) => state.auth)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormInputs>({
		resolver: zodResolver(registerSchema),
	})

	const onSubmit = async (data: RegisterFormInputs) => {
		const result = await dispatch(
			registerUser({
				email: data.email,
				password: data.password,
				age: data.age, // если есть
			})
		)
		if (registerUser.fulfilled.match(result)) {
			// успешная регистрация → редирект на login
			navigate('/login')
			console.log('Тут должен быть редирект')
		}
	}

	return (
		<Container>
			<Card className='w-full max-w-sm'>
				<CardHeader>
					<CardTitle>Create an account</CardTitle>
					<CardDescription>
						Enter your email below to create a new account
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
								<Label htmlFor='age'>Age</Label>
								<Input
									id='age'
									type='number'
									{...register('age', { valueAsNumber: true })}
								/>
								{errors.age && (
									<p className='text-red-500 text-sm'>{errors.age.message}</p>
								)}
							</div>

							<div className='grid gap-2'>
								<Label htmlFor='password'>Password</Label>
								<Input
									id='password'
									type='password'
									{...register('password')}
								/>
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
							{status === 'loading' ? 'Registering...' : 'Sign up'}
						</Button>
						<div className='mt-4 text-center text-sm'>
							Already have an account?{' '}
							<Link to='/login' className='underline underline-offset-4'>
								Log in
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</Container>
	)
}

export default RegisterForm
