import {
	Button,
	Col,
	Container,
	Form,
	FormControl,
	FormGroup,
	FormLabel,
	Image,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	Nav,
	Navbar,
	NavbarBrand,
	NavbarCollapse,
	NavbarToggle,
	Row,
} from 'react-bootstrap'
import ThemeSwitcher from '../../helpers/ThemesSwitcher.tsx'

const AuthLight = () => {
	const fontSize = 24 // Размер иконки
	const iconSize = 1.25 * fontSize // Размер шрифта (в 1.25 раза больше иконки)
	return (
		<>
			<main className='vh-100 bg-light ' data-bs-theme='light'>
				<Navbar bg='primary' variant='light'>
					<Navbar.Brand className='ms-2'>
						<Nav.Link
							href=''
							target='_blank'
							rel='noopener noreferrer'
							className='mx-auto'
						>
							<Image src='src/assets/logoRect/logo-dark.png' height='100' />
						</Nav.Link>
					</Navbar.Brand>
					<Nav className='mx-auto me-4 d-flex align-items-center'>
						<Button
							onClick={ThemeSwitcher}
							className='button me-2'
							style={{
								color: 'rgb(0,0,0)',
							}}
						>
							<i
								className='fa-solid fa-moon'
								style={{ fontSize: ` ${fontSize}px` }}
							></i>
						</Button>
						<span
							className='ms-2 text-light me-2'
							style={{ fontSize: `${fontSize}px` }}
						>
							Неопознанный крекер
						</span>
						<Col
							className='d-flex align-items-center ms-auto'
							style={{
								backgroundColor: '#FFFFFF',
								padding: '8px 12px',
								borderRadius: '50%',
								cursor: 'pointer',
							}}
						>
							<i
								className='fa-solid fa-user-slash'
								style={{ fontSize: ` ${iconSize}px` }}
							></i>
						</Col>
					</Nav>
				</Navbar>
				<Container className='col-md-12 mx-auto text-dark d-flex justify-content-center'>
					<Row className='w-100 d-flex justify-content-center'>
						<Col md={6} className='p-5 rounded bg-light'>
							<Form>
								<h2 className='mb-4'>Вход в аккаунт</h2>
								<Form.Group controlId='formBasicEmail'>
									<Form.Label>Почта</Form.Label>
									<Form.Control type='mail' placeholder='Введите почту' />
								</Form.Group>
								<Form.Group controlId='formBasicPassword' className='mt-2'>
									<Form.Label>Пароль</Form.Label>
									<Form.Control type='password' placeholder='Введите пароль' />
								</Form.Group>
								<Button variant='primary' type='submit' className='mt-3'>
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

export default AuthLight
