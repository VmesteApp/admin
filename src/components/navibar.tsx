import { useEffect, useState } from 'react'
import {
	Button,
	Collapse,
	Container,
	Nav,
	Navbar,
	NavbarBrand,
	NavbarCollapse,
	NavItem,
	Image,
} from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import {
	goToAdminProfile,
	goToProfiles,
	goToPulses,
	goToTags,
} from '../routes/routing'

const NaviBar = () => {
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

	return (
		<>
			<Navbar
				collapseOnSelect
				expand='lg'
				className={`border-bottom ${
					isDarkMode ? 'bg-dark text-light' : 'bg-primary text-dark'
				}`}
				data-bs-theme={`${isDarkMode ? 'dark' : 'light'}`}
				style={{ fontSize: '24px' }}
			>
				<NavbarBrand className='ms-2'>
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
								onClick={goToPulses}
								className={`btn w-100 text-decoration-none ${
									isDarkMode ? 'bg-dark text-light' : 'bg-primary text-light'
								}`}
								style={{ border: 'none', fontSize: '24px' }}
							>
								Pulses
							</Button>
						</NavItem>
						<NavItem className='mb-2'>
							<Button
								onClick={goToProfiles}
								className={`btn w-100 text-decoration-none ${
									isDarkMode ? 'bg-dark text-light' : 'bg-primary text-light'
								}`}
								style={{ border: 'none', fontSize: '24px' }}
							>
								Profiles
							</Button>
						</NavItem>
						<NavItem>
							<Button
								onClick={goToTags}
								className={`btn w-100 text-decoration-none ${
									isDarkMode ? 'bg-dark text-light' : 'bg-primary text-light'
								}`}
								style={{ border: 'none', fontSize: '24px' }}
							>
								Tags
							</Button>
						</NavItem>
					</Nav>
					<Nav className='mx-2'>
						<Button
							onClick={toggleTheme}
							className={`button  ${isDarkMode ? 'bg-dark' : 'bg-primary'}`}
							style={{
								color: 'rgb(255,255,255)',
								border: 'none',
							}}
						>
							<i
								className={`fa-solid ${
									isDarkMode ? 'fa-sun text-light' : 'fa-moon text-dark'
								} `}
								style={{ fontSize: ` ${fontSize}px` }}
							></i>
						</Button>
						<Button
							onClick={goToAdminProfile}
							className={`button btn-info me-2 d-flex w-100 text-decoration-none ${
								isDarkMode ? 'bg-dark text-light' : 'bg-primary text-light'
							}`}
							style={{ fontSize: '24px', border: 'none' }}
						>
							<NavItem className='me-2 mt-2'>Muraev Alexandr</NavItem>
							<NavItem className='border p-2' style={{ borderRadius: '30%' }}>
								<i className='fa-solid fa-user-tie'></i>
							</NavItem>
						</Button>
					</Nav>
				</NavbarCollapse>
			</Navbar>
			<Outlet />
		</>
	)
}

export default NaviBar
