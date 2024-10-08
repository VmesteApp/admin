import { SetStateAction, useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Api } from '../constants/api'

const Pulses = () => {
	const [pulses, setPulses] = useState([])
	const [editingPulse, setEditingPulse] = useState(null)

	const handleEditPulse = (pulse: SetStateAction<null>) => {
		setEditingPulse(pulse)
	}

	const handleSaveEdit = async (id: any, updatedData: null) => {
		const response = await fetch(`${Api.Content}/pulse/${id}`, {
			method: 'PUT',
			headers: {
				authorization: `Bearer ${sessionStorage.getItem('token')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedData),
		})

		try {
			if (response.ok) {
				fetchPulses()
				setEditingPulse(null)
			} else {
				console.error('Ошибка при обновлении импульса')
			}
		} catch (error) {
			console.error(error)
		}
	}

	const handleCancelEdit = () => {
		setEditingPulse(null)
	}

	const handleDeletePulses = async (id: any) => {
		if (!window.confirm('Вы уверены, что хотите удалить эту строку?')) {
			return
		}

		const response = await fetch(`${Api.Content}/pulse`, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${sessionStorage.getItem('token')}`,
			},
			body: JSON.stringify(id),
		})
		try {
			if (response.status === 200) {
				fetchPulses()
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleCreatePulse = async (payload: any) => {
		const response = await fetch(`${Api.Content}/pulse`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${sessionStorage.getItem('token')}`,
			},
			body: JSON.stringify(payload),
		})
		try {
			if (response.ok) {
				fetchPulses()
			}
		} catch (error) {
			console.log(error)
		}
	}

	const fetchPulses = async () => {
		const response = await fetch(`${Api.Content}/pulses`, {
			method: 'GET',
			headers: {
				authorization: `Bearer ${sessionStorage.getItem('token')}`,
				'content-type': 'application/json',
			},
		})

		try {
			if (response.status === 200) {
				const { pulses } = await response.json()

				setPulses(pulses)
			} else {
				setPulses([])
			}
		} catch (error) {
			console.log(error)
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
						<th scope='col'></th>
					</tr>
				</thead>
				<tbody>
					{pulses.length > 0 ? (
						pulses.map(row => (
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
											<Button
												type='button'
												className='btn btn-primary mr-2'
												onClick={() => handleSaveEdit(row.id, editingPulse)}
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
												onClick={() => handleDeleteDirection(row.id)}
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
