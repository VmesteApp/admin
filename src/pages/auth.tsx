import {
	Button,
	Col,
	Container,
	Form,
	Image,
	Nav,
	Navbar,
	Row,
} from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Api } from '../constants/api'

import { size } from '../constants/parametres'

const Auth = () => {
	const [email, setEmail] = useState<string>()
	const [password, setPassword] = useState<string>()
	const [emailError, setEmailError] = useState<string>(
		'Почта должна быть указана'
	)
	const [passwordError, setPasswordError] = useState<string>(
		'Пароль должен быть указан'
	)
	const [formValid, setFormValid] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		if (emailError || passwordError) {
			setFormValid(false)
		} else {
			setFormValid(true)
		}
	}, [emailError, passwordError])

	const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
		const filter =
			/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/
		if (!filter.test(String(e.target.value).toLowerCase())) {
			setEmailError('Почта некорректна')
		} else setEmailError('')
	}

	const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
		if (e.target.value.length < 4 || e.target.value.length > 100) {
			setPasswordError('Пароль некорректный')
		} else setPasswordError('')
	}

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()

		try {
			const response = await fetch(`${Api.Auth}/login`, {
				method: 'POST',
				body: JSON.stringify({ email, password }),
			})

			const data = await response.json()
			const { token, userId, role } = data

			if (token) {
				sessionStorage.setItem('token', token)
				sessionStorage.setItem('id', userId)
				sessionStorage.setItem('role', role)
				navigate('/profiles')
			}
		} catch (error) {
			console.log('Ошибка при авторизации: ', error)
		}
	}

	return (
		<>
			<main
				className='vh-100
					bg-dark text-light'
				data-bs-theme='dark'
			>
				<Navbar bg='primary'>
					<Navbar.Brand className='ms-4 mx-4'>
						<Nav.Link href='' target='_blank' rel='noopener noreferrer'>
							<Image
								src='src/assets/logo/logo-no-background.png'
								height='100'
								className='dark-logo '
							/>
						</Nav.Link>
					</Navbar.Brand>
					<Nav className='mx-auto me-4 d-flex align-items-center'>
						<span
							className='ms-2 me-2 text-light'
							style={{ fontSize: size.font }}
						>
							Неопознанный пользователь
						</span>
						<Col
							className='d-flex flex-column justify-content-center 
        align-items-center ms-auto '
							style={{
								padding: '8px 12px',
								borderRadius: '50%',
								cursor: 'pointer',
							}}
						>
							<i
								className='fa-solid fa-user-slash'
								style={{
									fontSize: size.icon,
								}}
							></i>
						</Col>
					</Nav>
				</Navbar>
				<Container className='col-md-12 mx-auto text-light d-flex justify-content-center'>
					<Row className='w-100 d-flex justify-content-center'>
						<Col
							md={6}
							className='p-5 rounded 
								bg-dark text-light '
						>
							<Form>
								<h2 className='mb-4'>Вход в аккаунт</h2>
								<Form.Group controlId='formBasicEmail'>
									<Container className='d-flex justify-content-between p-0'>
										<Form.Label>Почта</Form.Label>
										<Form.Label style={{ color: 'red' }}>
											{emailError}
										</Form.Label>
									</Container>
									<Form.Control
										value={email}
										onChange={emailHandler}
										type='email'
										placeholder='Введите почту'
									/>
								</Form.Group>
								<Form.Group controlId='formBasicPassword' className='mt-2'>
									<Container className='d-flex justify-content-between p-0'>
										<Form.Label>Пароль</Form.Label>
										<Form.Label style={{ color: 'red' }}>
											{passwordError}
										</Form.Label>
									</Container>
									<Form.Control
										value={password}
										onChange={passwordHandler}
										type='password'
										placeholder='Введите пароль'
									/>
								</Form.Group>
								<Button
									onClick={handleSubmit}
									disabled={!formValid}
									variant='primary'
									type='submit'
									className='mt-3'
								>
									Вход
								</Button>
							</Form>
						</Col>
					</Row>
				</Container>
			</main>
		</>
	)
}

export default Auth
