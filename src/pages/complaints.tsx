import { SetStateAction, useEffect, useState } from 'react'
import { Button, Container, Modal } from 'react-bootstrap'

import api from '../network'

interface Complaint {
	id: number
	pulse_id: number
	message: string
	status: string
}

const Complaints = () => {
	const [complaints, setComplaints] = useState<Complaint[]>([])

	const [currentPage, setCurrentPage] = useState<number>(1)
	const [complaintsPerPage] = useState<number>(10) // Количество жалоб на странице
	const indexOfLastComplaint: number = currentPage * complaintsPerPage
	const indexOfFirstComplaint: number = indexOfLastComplaint - complaintsPerPage
	const currentComplaints = complaints.slice(
		indexOfFirstComplaint,
		indexOfLastComplaint
	)

	const [showFullMessage, setShowFullMessage] = useState<boolean>(false)
	const [fullMessage, setFullMessage] = useState<string>('')

	const handleApprove = async (ID: number, verdict: string) => {
		const response = await api.put(`/content/complaints/${ID}/verdict`, {
			verdict: verdict,
		})
		try {
			if (response.status === 200) fetchComplaints()
			else console.error('Ошибка обновления статуса заявки')
		} catch (error) {
			console.error(error)
		}
	}

	const fetchComplaints = async () => {
		const response = await api.get('/content/complaints')
		try {
			if (response.status === 200) {
				setComplaints(response.data.complaints)
			} else {
				setComplaints([])
				console.error('Ошибка при загрузке списка жалоб')
			}
		} catch (error) {
			console.error(error)
		}
	}

	const paginate = (pageNumber: SetStateAction<number>) =>
		setCurrentPage(pageNumber)
	const pageNumbers = []
	for (let i = 1; i <= Math.ceil(complaints.length / complaintsPerPage); i++) {
		pageNumbers.push(i)
	}

	const handleShowFullMessage = (message: string) => {
		setFullMessage(message)
		setShowFullMessage(true)
	}
	const handleCloseFullMessage = () => setShowFullMessage(false)

	useEffect(() => {
		fetchComplaints()
	}, [])
	return (
		<>
			<Container className='d-flex justify-content-end p-3'>
				<Button
					onClick={fetchComplaints}
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
							Id
						</th>
						<th style={{ textAlign: 'center' }} scope='col'>
							Pulse_Id{' '}
						</th>
						<th style={{ paddingLeft: '10px' }} scope='col'>
							Message
						</th>
						<th style={{ textAlign: 'center' }} scope='col'>
							Status
						</th>
						<th style={{ paddingLeft: '10px' }} scope='col'></th>
					</tr>
				</thead>
				<tbody className='vertical-allign-center'>
					{currentComplaints.length > 0 ? (
						currentComplaints.map((row: Complaint) => (
							<tr key={row.id}>
								<td style={{ width: '3%', paddingLeft: '15px' }}>{row.id}</td>
								<td style={{ width: '4%', paddingLeft: '15px' }}>
									{row.pulse_id}
								</td>
								<td style={{ paddingLeft: '15px' }}>
									{row.message.length > 50 ? (
										<span
											onClick={() => handleShowFullMessage(row.message)}
											style={{ cursor: 'pointer' }}
										>
											{`${row.message.substring(0, 100)}...`}
										</span>
									) : (
										row.message
									)}
								</td>
								<td style={{ width: '7%', textAlign: 'center' }}>
									{row.status}
								</td>
								<td style={{ width: '20%', textAlign: 'center' }}>
									{row.status === 'APPROVED' ||
									row.status === 'REJECTED' ? null : ( // Если статус "APPROVED" или "REJECT", то кнопки не показываются
										// В противном случае, показываются кнопки
										<>
											<Button
												type='button'
												className='btn btn-primary mr-2 mx-2'
												onClick={() => handleApprove(row.id, 'APPROVED')}
												disabled={row.status === 'APPROVED'}
											>
												Одобрить
											</Button>{' '}
											<Button
												type='button'
												className='btn btn-secondary'
												onClick={() => handleApprove(row.id, 'REJECTED')}
												disabled={row.status === 'REJECTED'}
											>
												Отклонить
											</Button>
										</>
									)}
								</td>
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
			<Modal show={showFullMessage} onHide={handleCloseFullMessage}>
				<Modal.Header closeButton>
					<Modal.Title>Полное сообщение</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
					{fullMessage}
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleCloseFullMessage}>
						Закрыть
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default Complaints
