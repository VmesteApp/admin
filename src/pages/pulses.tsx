import { SetStateAction, useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import api from '../network'

interface Pulse {
	id: number
	name: string
	created_at: string
	blocked: string
}

const Pulses = () => {
	const [pulses, setPulses] = useState<Pulse[]>([])
	const [editingPulse, setEditingPulse] = useState<Pulse | null>(null)

	const [currentPage, setCurrentPage] = useState<number>(1)
	const [pulsesPerPage] = useState<number>(10) // Количество жалоб на странице
	const indexOfLastPulse: number = currentPage * pulsesPerPage
	const indexOfFirstPulse: number = indexOfLastPulse - pulsesPerPage
	const currentPulses = pulses.slice(indexOfFirstPulse, indexOfLastPulse)
	const Skip: number = 0
	const Limit: number = 100
	const handleEditPulse = (pulse: Pulse) => {
		setEditingPulse(pulse)
	}

	const handleSaveEdit = async (updatedData: Pulse) => {
		const response = await api.put('/content/pulses', updatedData)
		try {
			if (response.status === 200) {
				fetchPulses(Skip, Limit)
				setEditingPulse(null)
			} else console.error('Ошибка при обновлении импульса')
		} catch (error) {
			console.error(error)
		}
	}

	const handleCancelEdit = () => {
		setEditingPulse(null)
	}

	const handleChangePulseStatus = async (id: number, blocked: string) => {
		const response = await api.put(`/content/admin/pulse/${id}/moderation`, {
			blocked: blocked,
		})

		try {
			if (response.status === 200) fetchPulses(Skip, Limit)
			else console.error('Ошибка при блокировании импульса')
		} catch (error) {
			console.error(error)
		}
	}

	const fetchPulses = async (skip: number, limit: number) => {
		const response = await api.get('/content/admin/pulses', {
			params: {
				skip,
				limit,
			},
		})

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

	const paginate = (pageNumber: SetStateAction<number>) =>
		setCurrentPage(pageNumber)

	const pageNumbers = []
	for (let i = 1; i <= Math.ceil(pulses.length / pulsesPerPage); i++) {
		pageNumbers.push(i)
	}

	useEffect(() => {
		fetchPulses(Skip, Limit)
	}, [])

	return (
		<>
			<Container className='d-flex justify-content-end p-3'>
				<Button
					onClick={() => fetchPulses(Skip, Limit)}
					type='button'
					className='btn btn-secondary'
				>
					Обновить таблицу
				</Button>
			</Container>

			<table className='table table-striped table-hover table-bordered table-sm'>
				<thead>
					<tr>
						<th style={{ textAlign: 'center' }} scope='col'>
							Pulse_Id
						</th>
						<th style={{ textAlign: 'center' }} scope='col'>
							Название
						</th>
						<th style={{ textAlign: 'center' }} scope='col'>
							Дата создания
						</th>
						<th style={{ textAlign: 'center' }} scope='col'>
							Статус
						</th>
					</tr>
				</thead>
				<tbody>
					{currentPulses.length > 0 ? (
						currentPulses.map((row: Pulse) => (
							<tr key={row.id} onDoubleClick={() => handleEditPulse(row)}>
								{editingPulse?.id === row.id ? (
									<>
										<td>
											<input type='text' value={editingPulse.id} />
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
											<input type='text' value={editingPulse.created_at} />
										</td>
										<td>
											<input
												type='text'
												value={editingPulse.blocked ? 'true' : 'false'}
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
										<td style={{ width: '4%', paddingLeft: '15px' }}>
											{row.id}
										</td>
										<td style={{ width: '30%', paddingLeft: '15px' }}>
											{row.name}
										</td>
										<td style={{ width: '15%', textAlign: 'center' }}>
											{row.created_at}
										</td>
										<td style={{ width: '10%', textAlign: 'center' }}>
											{row.blocked ? 'Заблокирован' : 'Активен'}
										</td>
										<td style={{ width: '15%', textAlign: 'center' }}>
											<Button
												type='button'
												className='btn btn-secondary'
												onClick={() =>
													handleChangePulseStatus(
														row.id,
														row.blocked ? 'false' : 'true'
													)
												}
											>
												{' '}
												{row.blocked ? 'Разблокировать' : 'Заблокировать'}{' '}
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
			<Container className='d-flex justify-content-center'>
				<nav aria-label='Page navigation example'>
					<ul className='pagination'>
						{pageNumbers.map(number => (
							<li key={number} className='page-item'>
								<a
									className={
										currentPage === number ? 'page-link active' : 'page-link'
									}
									style={{ cursor: 'pointer' }}
									onClick={() => paginate(number)}
								>
									{number}
								</a>
							</li>
						))}
					</ul>
				</nav>
			</Container>
		</>
	)
}

export default Pulses
