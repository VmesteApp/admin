import { useEffect } from 'react'
// import { useAppDispatch, useAppSelector } from './hooks'
// import { skillSlice } from './store/reducers/SkillSlice'
// import { fetchSkills } from './store/reducers/ActionCreators'
import { useRoutes } from 'react-router-dom'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './routes/routes'
import { sessionRemover } from './helpers/browserStorage.ts'
const AppRoutes = () => {
	return useRoutes(
		sessionStorage.getItem('token') ? PRIVATE_ROUTES : PUBLIC_ROUTES
	)
}

function App() {
	useEffect(() => {}, [])
	//sessionRemover()
	sessionStorage.setItem('role', 'superadmin')
	return (
		<>
			<AppRoutes />
		</>
	)
}

export default App
