import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'
import { skillSlice } from './store/reducers/SkillSlice'
import { fetchSkills } from './store/reducers/ActionCreators'

function App() {
	const dispatch = useAppDispatch()
	const { skills, isLoading, error } = useAppSelector(
		state => state.skillReducer
	)

	useEffect(() => {
		dispatch(fetchSkills)
	}, [])

	return (
		<div>
			<h1></h1>
			{isLoading && <h1>Идет загрузка...</h1>}
			{error && <h1>{error}</h1>}
			{JSON.stringify(skills, null, 2)}
		</div>
	)
}

export default App
