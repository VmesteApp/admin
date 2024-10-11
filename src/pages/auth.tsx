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

import { useEffect, useState } from 'react'
import { Api } from '../constants/api'
import { goToAdminProfile } from '../routes/routing'

const Auth = () => {
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [emailError, setEmailError] = useState('Почта должна быть указана')
	const [passwordError, setPasswordError] = useState(
		'Пароль должен быть указан'
	)
	const [formValid, setFormValid] = useState(false)

	useEffect(() => {
		if (emailError || passwordError) {
			setFormValid(false)
		} else {
			setFormValid(true)
		}
	}, [emailError, passwordError])

	const emailHandler = (e: any) => {
		setEmail(e.target.value)
		const filter =
			/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/
		if (!filter.test(String(e.target.value).toLowerCase())) {
			setEmailError('Почта некорректна')
		} else setEmailError('')
	}

	const passwordHandler = (e: any) => {
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
			const { id, token, role } = data

			if (token) {
				sessionStorage.setItem('token', token)
				sessionStorage.setItem('id', id)
				sessionStorage.setItem('role', role)
				goToAdminProfile()
			}
		} catch (error) {
			console.log('Ошибка при авторизации: ', error)
		}
	}

	const [isDarkMode, setIsDarkMode] = useState(() => {
		const savedMode = localStorage.getItem('darkMode')
		return savedMode === 'true' // Преобразуем строку в булевое значение
	})

	const toggleTheme = () => {
		const newMode = !isDarkMode
		setIsDarkMode(newMode)
		localStorage.setItem('darkMode', String(newMode))
	}

	const fontSize = 24
	const iconSize = 1.2 * fontSize
	return (
		<>
			<main
				className={`vh-100 ${
					isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'
				}`}
				data-bs-theme={`${isDarkMode ? 'dark' : 'light'}`}
			>
				<Navbar bg='primary'>
					<Navbar.Brand className='ms-2'>
						<Nav.Link
							href=''
							target='_blank'
							rel='noopener noreferrer'
							className='mx-auto'
						>
							<Image
								src='src/assets/logo/logo-no-background.png'
								height='100'
								className='dark-logo '
							/>
						</Nav.Link>
					</Navbar.Brand>
					<Nav className='mx-auto me-4 d-flex align-items-center'>
						<Button
							onClick={toggleTheme}
							className='button me-2 mt-2'
							style={{
								color: 'rgb(255,255,255)',
							}}
						>
							<i
								className={`fa-solid ${
									isDarkMode ? 'fa-sun text-light' : 'fa-moon text-dark'
								} `}
								style={{ fontSize: ` ${fontSize}px` }}
							></i>
						</Button>
						<span
							className='ms-2 me-2 text-light'
							style={{ fontSize: `${fontSize}px` }}
						>
							Неопознанный крекер
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
									fontSize: ` ${iconSize}px`,
								}}
							></i>
						</Col>
					</Nav>
				</Navbar>
				<Container className='col-md-12 mx-auto text-light d-flex justify-content-center'>
					<Row className='w-100 d-flex justify-content-center'>
						<Col
							md={6}
							className={`p-5 rounded ${
								isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'
							}`}
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
										onChange={e => emailHandler(e)}
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
										onChange={e => passwordHandler(e)}
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
