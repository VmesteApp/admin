import { useEffect } from 'react'
// import { useAppDispatch, useAppSelector } from './hooks'
// import { skillSlice } from './store/reducers/SkillSlice'
// import { fetchSkills } from './store/reducers/ActionCreators'
import { useRoutes } from 'react-router-dom'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './routes/routes'

const AppRoutes = () => {
	return useRoutes(
		sessionStorage.getItem('token') ? PRIVATE_ROUTES : PUBLIC_ROUTES
	)
}

function App() {
	useEffect(() => {}, [])
	sessionStorage.setItem('token', 'token')
	return (
		<>
			<AppRoutes />
		</>
	)
}

export default App
