import { useState } from 'react'
import {
	Button,
	Nav,
	Navbar,
	NavbarBrand,
	NavbarCollapse,
	NavItem,
	Image,
} from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { size } from '../constants/parametres'
import { useNavigate } from 'react-router-dom'
import { hasRole, logout } from '../helpers/checkAuth'
const NaviBar = () => {
	const [activeButton, setActiveButton] = useState(
		sessionStorage.getItem('activeButton')
	)

	const toggleActiveButton = (buttonName: string) => {
		setActiveButton(buttonName)
		sessionStorage.setItem('activeButton', buttonName)
	}
	const navigate = useNavigate()

	return (
		<>
			<Navbar
				collapseOnSelect
				expand='lg'
				className='border-bottom bg-dark text-light'
				data-bs-theme='dark'
			>
				<NavbarBrand className='ms-4 mx-4'>
					<Nav.Link
						href=''
						target='_blank'
						rel='noopener noreferrer'
						className='mx-auto'
					>
						<Image
							src='src/assets/logo/logo-no-background.png'
							height='60'
							className='dark-logo '
						/>
					</Nav.Link>
				</NavbarBrand>
				<NavbarCollapse id='navbarSupportedContent'>
					<Nav className='mx-auto'>
						<NavItem className='mb-2'>
							<Button
								onClick={() => {
									toggleActiveButton('Pulses') // Вызываем функцию при клике
									navigate('/pulses')
								}}
								className='btn w-100 text-decoration-none bg-dark text-light'
								style={{
									border: 'none',
									borderBottom:
										activeButton === 'Pulses' ? '2px solid #007bff ' : 'none',
									fontSize: size.font,
								}}
							>
								Pulses
							</Button>
						</NavItem>
						<NavItem className='mb-2'>
							<Button
								onClick={() => {
									toggleActiveButton('Profiles') // Вызываем функцию при клике
									navigate('profiles')
								}}
								className='btn w-100 text-decoration-none bg-dark text-light'
								style={{
									border: 'none',
									borderBottom:
										activeButton === 'Profiles' ? '2px solid #007bff' : 'none',
									fontSize: size.font,
								}}
							>
								Profiles
							</Button>
						</NavItem>
						<NavItem>
							<Button
								onClick={() => {
									toggleActiveButton('Tags') // Вызываем функцию при клике
									navigate('tags')
								}}
								className='btn w-100 text-decoration-none bg-dark text-light'
								style={{
									border: 'none',
									borderBottom:
										activeButton === 'Tags' ? '2px solid #007bff' : 'none',
									fontSize: size.font,
								}}
							>
								Tags
							</Button>
						</NavItem>
						<NavItem>
							<Button
								disabled={sessionStorage.getItem('role') === 'admin'} // Отключаем кнопку для роли "admin"
								onClick={() => {
									toggleActiveButton('Admins')
									navigate('/admins')
								}}
								className='btn w-100 text-decoration-none bg-dark text-light'
								style={{
									fontSize: size.font,
									border: 'none',
									borderBottom:
										activeButton === 'Admins' ? '2px solid #007bff' : 'none',
								}}
							>
								Admins
							</Button>
						</NavItem>
					</Nav>
					<Nav className='mx-4' style={{ fontSize: '24px', border: 'none' }}>
						<NavItem className='me-2 mt-2'>
							{sessionStorage.getItem('role')}
						</NavItem>
						<NavItem className='border p-2' style={{ borderRadius: '30%' }}>
							<i className='fa-solid fa-user-tie'></i>
						</NavItem>
						<Button
							onClick={logout}
							className='button  bg-dark'
							style={{
								color: 'rgb(255,255,255)',
								border: 'none',
							}}
						>
							Выйти
						</Button>
					</Nav>
				</NavbarCollapse>
			</Navbar>
			<Outlet />
		</>
	)
}

export default NaviBar
