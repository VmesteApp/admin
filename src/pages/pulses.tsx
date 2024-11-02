import { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import apiContent from '../axiosConfig/axConfContent'

interface Pulse {
	id: number
	category: string
	name: string
	tags: string
	description: string
	shortDescription: string
	status: string
}

const Pulses = () => {
	const [pulses, setPulses] = useState<Pulse[]>([])
	const [editingPulse, setEditingPulse] = useState<Pulse | null>(null)

	const handleEditPulse = (pulse: Pulse) => {
		setEditingPulse(pulse)
	}

	const handleSaveEdit = async (updatedData: Pulse) => {
		const response = await apiContent.put('/pulses', updatedData)
		try {
			if (response.status === 200) {
				fetchPulses()
				setEditingPulse(null)
			} else console.error('Ошибка при обновлении импульса')
		} catch (error) {
			console.error(error)
		}
	}

	const handleCancelEdit = () => {
		setEditingPulse(null)
	}

	const handleDeletePulses = async (id: number) => {
		if (!window.confirm('Вы уверены, что хотите удалить эту строку?')) {
			return
		}

		const response = await apiContent.delete(`/pulse${id}`)

		try {
			if (response.status === 200) fetchPulses()
			else console.error('Ошибка при удалении импульса')
		} catch (error) {
			console.error(error)
		}
	}

	const fetchPulses = async () => {
		const response = await apiContent.get('/pulses')

		try {
			if (response.status === 200) setPulses(response.data.pulses)
			else {
				console.error('Ошибка при загрузке импульсов')
				setPulses([])
			}
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchPulses()
	}, [])

	return (
		<>
			<Container className='d-flex justify-content-end p-3'>
				<Button
					onClick={fetchPulses}
					type='button'
					className='btn btn-secondary'
				>
					Обновить таблицу
				</Button>
			</Container>

			<table className='table table-striped table-hover table-bordered table-sm'>
				<thead>
					<tr>
						<th scope='col'>Категория</th>
						<th scope='col'>Название</th>
						<th scope='col'>Теги</th>
						<th scope='col'>Описание</th>
						<th scope='col'>Краткое описание</th>
						<th scope='col'>Статус</th>
						<th scope='col'></th>
					</tr>
				</thead>
				<tbody>
					{pulses.length > 0 ? (
						pulses.map((row: Pulse) => (
							<tr key={row.id} onDoubleClick={() => handleEditPulse(row)}>
								{editingPulse?.id === row.id ? (
									<>
										<td>
											<input
												type='text'
												value={editingPulse.category}
												onChange={e =>
													setEditingPulse({
														...editingPulse,
														category: e.target.value,
													})
												}
											/>
										</td>
										<td>
											<input
												type='text'
												value={editingPulse.name}
												onChange={e =>
													setEditingPulse({
														...editingPulse,
														name: e.target.value,
													})
												}
											/>
										</td>
										<td>
											<input
												type='text'
												value={editingPulse.tags}
												onChange={e =>
													setEditingPulse({
														...editingPulse,
														tags: e.target.value,
													})
												}
											/>
										</td>
										<td>
											<input
												type='text'
												value={editingPulse.description}
												onChange={e =>
													setEditingPulse({
														...editingPulse,
														description: e.target.value,
													})
												}
											/>
										</td>
										<td>
											<input
												type='text'
												value={editingPulse.shortDescription}
												onChange={e =>
													setEditingPulse({
														...editingPulse,
														shortDescription: e.target.value,
													})
												}
											/>
										</td>
										<td>
											<input
												type='text'
												value={editingPulse.status}
												onChange={e =>
													setEditingPulse({
														...editingPulse,
														status: e.target.value,
													})
												}
											/>
										</td>
										<td>
											<Button
												type='button'
												className='btn btn-primary mr-2'
												onClick={() => handleSaveEdit(editingPulse)}
											>
												Сохранить
											</Button>
											<Button
												type='button'
												className='btn btn-secondary'
												onClick={handleCancelEdit}
											>
												Отмена
											</Button>
										</td>
									</>
								) : (
									<>
										<td>{row.category}</td>
										<td>{row.name}</td>
										<td>{row.tags}</td>
										<td>{row.description}</td>
										<td>{row.shortDescription}</td>
										<td>
											<Button
												type='button'
												className='btn btn-light'
												onClick={() => handleDeletePulses(row.id)}
											>
												<span>
													<i className='fa-solid fa-trash'></i>
												</span>
											</Button>
										</td>
									</>
								)}
							</tr>
						))
					) : (
						<tr>
							<td>Данные не найдены.</td>
						</tr>
					)}
				</tbody>
			</table>
		</>
	)
}

export default Pulses
