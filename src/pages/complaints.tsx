import { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'

import apiComplaints from '../axiosConfig/axConfComplaints'

interface Complaint {
	id: number
	pulse_id: number
	message: string
	status: string
}

const Complaints = () => {
	const [complaints, setComplaints] = useState<Complaint[]>([])

	const handleApprove = async (ID: number, verdict: string) => {
		const response = await apiComplaints.put(`/${ID}/verdict`, {
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
		const response = await apiComplaints.get('')
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
						<th scope='col'>Id</th>
						<th scope='col'>Pulse_Id </th>
						<th scope='col'>Message</th>
						<th scope='col'>Status</th>
						<th scope='col'></th>
					</tr>
				</thead>
				<tbody>
					{complaints.length > 0 ? (
						complaints.map((row: Complaint) => (
							<tr key={row.id}>
								<td>{row.id}</td>
								<td>{row.pulse_id}</td>
								<td>{row.message}</td>
								<td>{row.status}</td>
								<td>
									<Button
										type='button'
										className='btn btn-primary mr-2 mx-2'
										onClick={() => handleApprove(row.id, 'APPROVED')}
									>
										Одобрить
									</Button>
									<Button
										type='button'
										className='btn btn-secondary'
										onClick={() => handleApprove(row.id, 'REJECT')}
									>
										Отклонить
									</Button>
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
		</>
	)
}

export default Complaints
