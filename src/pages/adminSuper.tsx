import { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateAdminModal from '../components/createAdminModal'
import api from '../network'

interface Admin {
	userId: number
	email: string
}
interface CreateAdminForm {
	email: string
	password: string
}

const SuperAdmin = () => {
	const [admins, setAdmins] = useState<Admin[]>([])
	const [visibleModal, setVisibleModal] = useState(false)

	const handleCreateAdmin = async (payload: CreateAdminForm) => {
		const response = await api.post('/auth/admin', payload)
		try {
			if (response.status === 200) fetchAdmins()
			else console.error('Ошибка при создании администратора')
		} catch (error) {
			console.error(error)
		}
	}
	const handleDeleteAdmin = async (userId: number) => {
		if (
			!window.confirm('Вы уверены, что хотите удалить этого администратора ?')
		) {
			return
		}
		const response = await api.delete(`/auth/admin/${userId}`)
		try {
			if (response.status === 200) fetchAdmins()
			else console.error('Ошибка при удалении администратора')
		} catch (error) {
			console.error(error)
		}
	}

	const fetchAdmins = async () => {
		const response = await api.get('/auth/admin')
		try {
			if (response.status === 200) setAdmins(response.data)
			else console.error('Ошибка загрузки списка администраторов')
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchAdmins()
	}, [])

	const toggleModal = () => {
		setVisibleModal(!visibleModal)
	}
	return (
		<>
			<Container className='d-flex justify-content-end p-3'>
				<Button
					onClick={toggleModal}
					type='button'
					className='btn btn-secondary'
				>
					Создать профиль администратора
				</Button>
			</Container>

			<CreateAdminModal
				visibleModal={visibleModal}
				onClose={() => setVisibleModal(false)}
				onSubmit={(payload: CreateAdminForm) => handleCreateAdmin(payload)}
			/>
			<table className='table table-striped table-hover table-bordered table-sm'>
				<thead>
					<tr>
						<th scope='col'>Id</th>
						<th scope='col'>Почта</th>
						<th scope='col'></th>
					</tr>
				</thead>
				<tbody>
					{admins.length > 0 ? (
						admins.map(row => (
							<tr key={row.userId}>
								<td>{row.userId}</td>
								<td>{row.email}</td>
								<td>
									<Button
										type='button'
										className='btn btn-light'
										onClick={() => handleDeleteAdmin(row.userId)}
									>
										<span>
											<i className='fa-solid fa-trash'></i>
										</span>
									</Button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td>Данные не найдены</td>
						</tr>
					)}
				</tbody>
			</table>
		</>
	)
}

export default SuperAdmin
