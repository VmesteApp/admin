import { useState } from 'react'
import {
	Button,
	Collapse,
	Container,
	Nav,
	Navbar,
	NavbarCollapse,
	NavItem,
} from 'react-bootstrap'

const NaviBar = () => {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		const savedMode = localStorage.getItem('darkMode')
		return savedMode === 'true' // Преобразуем строку в булевое значение
	})

	const [isSidebarOpen, setIsSidebarOpen] = useState(false) // Состояние для боковой панели

	return (
		<>
			<Navbar
				collapseOnSelect
				expand='lg'
				className={`border-bottom ${
					isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'
				}`}
			>
				<Container className='container-fluid'>
					<Button
						className={`${
							isDarkMode ? 'bg-dark text-light ' : 'bg-light  text-dark'
						}`}
						style={{ border: 'none', fontSize: '20px' }}
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					>
						<i className='fa-solid fa-bars'></i>
					</Button>

					<NavbarCollapse
						className={`${isDarkMode ? 'bg-dark ' : 'bg-light '}`}
						id='navbarSupportedContent'
					>
						<Nav className='me-auto mb-2 mb-lg-0'>
							<NavItem>hello</NavItem>
							<NavItem>hay</NavItem>
							<NavItem className='dropdown'>hay</NavItem>
						</Nav>
					</NavbarCollapse>
				</Container>
			</Navbar>

			{/* Боковая навигационная панель */}
			<Collapse in={isSidebarOpen}>
				<Container
					id='sidebar'
					style={{
						position: 'fixed',
						top: 56,
						left: 0,
						width: '250px',
						padding: '20px',
						height: '100vh',
						backgroundColor: isDarkMode ? '#343a40' : '#ffffff',
						color: isDarkMode ? 'white' : 'black',
						boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
						zIndex: 1000,
					}}
				>
					<Nav className='flex-column p-10'>
						<NavItem
							className='mb-3'
							style={{
								borderBottom: isDarkMode
									? '1px solid rgba(255, 255, 255, 0.1)'
									: '1px solid rgba(0, 0, 0, 0.1)',
							}}
						>
							<strong>Menu</strong>
						</NavItem>
						<NavItem className='mb-2'>
							<Button
								className={`btn w-100 text-decoration-none ${
									isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'
								}`}
								style={{ border: 'none' }}
							>
								Projects
							</Button>
						</NavItem>
						<NavItem className='mb-2'>
							<Button
								className={`btn w-100 text-decoration-none ${
									isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'
								}`}
								style={{ border: 'none' }}
							>
								Profiles
							</Button>
						</NavItem>
						<NavItem>
							<Button
								className={`btn w-100 text-decoration-none ${
									isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'
								}`}
								style={{ border: 'none' }}
							>
								3
							</Button>
						</NavItem>
					</Nav>
				</Container>
			</Collapse>
		</>
	)
}

export default NaviBar
